//This is the javascript file outside of the public directory

var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
app.use(express.static("public"));
const fs = require("fs");
//const { callbackify } = require("util");

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
            console.log('attempt');
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
            return
        }
        else{
            //iterate through the json file,
            console.log(req.body.Email);
            //var getValues = JSON.parse(req.body);
            console.log("server side");
            //console.log("email -> ",getValues.Email);
                //test to see if the email is the same as the one we are inputting, if it is then test against the password
                    //if password is not equal then return false
                    //else return true
        }
        //return false
    })
})



app.listen(3000, function(){ //make the port 3000 listen
    console.log("Express listening at port 3000"); //log that this is happening
});


//TODO -- we need to compare the values when we log in (email to emails, then when emails equal each other compare passwords etc.
