//This is the javascript file outside of the public directory

var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
app.use(express.static("public"));
const fs = require("fs");
//const { callbackify } = require("util");

var emailAccount;


app.post("/",jsonParser,function(req,res){
    const body = JSON.stringify(req.body);


    fs.readFile('jsonFile.json','utf8', (err, data) => {
        if (err) {
            console.error(err);
            return
        }
        else{
            var jsonValues = JSON.parse(data); //
            jsonValues.accounts.push(body); //add values to the json accounts
            console.log(jsonValues);
            var jsonStringify = JSON.stringify(jsonValues);
            fs.writeFile('jsonFile.json',jsonStringify,'utf-8',err => {
                if (err) {
                    console.error(err)
                    return
                }
            });
        }
    })
})

app.post("/SignIn",jsonParser,function(req,res){ //this will be called to return a value
    fs.readFile('jsonFile.json','utf8', (err, data) => {
        if (err) {
            console.log("error reading the file");
            console.error(err);
            res.send(false);
            return;
        }
        else{
            var jsonValues = (JSON.parse(data)).accounts;
            for(var i = 0; i<jsonValues.length; i++){
                var lineJsonValues = JSON.parse(jsonValues[i]);
                if (lineJsonValues.Email == req.body.Email){
                    if(lineJsonValues.Password == req.body.Password){
                        console.log("sign in successfull");
                        emailAccount = lineJsonValues.Email;
                        res.send(true);
                        return;
                    }
                }
            }
            res.send(false);
            return;
        }
    })
})



app.listen(3000, function(){ //make the port 3000 listen
    console.log("Express listening at port 3000"); //log that this is happening
});


//TODO -- we need to compare the values when we log in (email to emails, then when emails equal each other compare passwords etc.