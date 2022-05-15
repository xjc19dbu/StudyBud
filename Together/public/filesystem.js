
const fs = require("fs");

fs.readFile("./customer.json", "utf8", (err, jsonString) => {
    if(err) {
        console.log("File read failed:", err);
        return;
    }
    try{
        const customer = JSON.parse(jsonString);
        console.log("Customer address is: ", customer.address);
    } catch(err) {
        console.log("Error parsing JSON string:", err);
    }
});


// Read File
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if(err){
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

jsonReader("./customer.json", (err, customer) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(customer.address);
});




// Write File


const customer = {
    name: "James Pooley",
    order_count: 0,
    address: "17 Windsor Chase"
};

const jsonString = JSON.stringify(customer)fs.writeFile("./newCustomer.json", jsonString, err => {
    if(err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
console.log(jsonString);td

