//This is the javascript file inside of the public directory

var emailAccount = "null";
var semesterProfile = "No semester selected";



function onRegistrationClick(event){
    event.preventDefault();

    const values = {
        Forename : (document.getElementById("Forename").value),
        Surname : (document.getElementById("Surname").value),
        Email : (document.getElementById("Email").value),
        Password : (document.getElementById("Password").value)
    }

    const stringifyValues = JSON.stringify(values);

    fetch("/SignUp",{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: stringifyValues})
        location.href = 'Dashboard.html'; //go to the dashboard
}

function onSignInClick(event){
    event.preventDefault();

    let email = document.getElementById('Email').value;

    const values = 
    { Email: document.getElementById("Email").value,
     Password: document.getElementById("Password").value}

    fetch("/SignIn",{ //getting the values to compare with outside of the public directory
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)})
        .then(response => response.json())
        .then(d => {
            console.log(d)
            if(d == true){
                emailAccount = email;
                console.log(emailAccount);
                location.href = 'Dashboard.html';
            }
            else{
                alert("Sign in unsuccessful")
        }})
        .catch(err => {
            console.log("Error Reading data " + err);
        });
    return;
}

function onSubmitProfileClick(event){/////////////////////////////////////////////////////////////////////////////
    event.preventDefault();

    console.log("fucking wanker");

    const values = {
        name:(document.getElementById("semesterName").value)
    }

    const stringifyValues = JSON.stringify(values);
    console.log("before");
    console.log(values);

    fetch("/submitNewProfile",{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: stringifyValues})
}

function infoBoxPop(id){
    for(let i = 0;i < data.length;i++){
        let Module = data[i].Module;
        for(const [key, value] of Object.entries(data[i])){
            if(key == "Tasks"){
                let tasks = value.split("||")
                for(let z = 0; z < tasks.length;z++){
                    let dataid = Module + " " + tasks[z];
                    if(dataid == id){
                        let Activities = data[i].Activities.split("||");
                        document.getElementById("activities").innerText = Activities[z];
                        let Contributions = data[i].Contribution.split("||");
                        document.getElementById("contributions").innerText = Contributions[z];
                    }
                }
            }
        }
    }
}

function submitForm(id){
    for(let i = 0;i < data.length;i++){
        let Module = data[i].Module;
        for(const [key, value] of Object.entries(data[i])){
            if(key == "Tasks"){
                let tasks = value.split("||")
                for(let z = 0; z < tasks.length;z++){
                    let dataid = Module + " " + tasks[z];
                    if(dataid == id){
                        let Activities = data[i].Activities.split("||");
                        Activities[z] = document.getElementById("activity").value;
                        data[i].Activities = Activities.join("||");
                        let Contribution = data[i].Contribution.split("||");
                        Contribution[z] = document.getElementById("contribution").value;
                        data[i].Contribution = Contribution.join("||");;
                    }
                }
            }
        }
    } 
}

function openForm(id){
    document.getElementById("popupForm").style.display = "block";
    document.getElementById("infoBox").style.display = "block";
    infoBoxPop(id);
    document.getElementById("formTitle").innerText = id;
}

function closeForm(){
    document.getElementById("popupForm").style.display = "none";
    document.getElementById("infoBox").style.display = "none";
}

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\r\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
    return arr;
}

function populate(){
    for(let i = 0;i < data.length;i++){
        let dateStart = data[i].Start.split("||");
        let dateEnd = data[i].End.split("||");
        let Percent = data[i].Weighting.split("||");
        for(const [key, value] of Object.entries(data[i])){
            if(key == "Tasks"){
                let tasks = value.split("||")
                for(let z = 0; z < tasks.length;z++){
                    var newElement = document.createElement("div");
                    newElement.innerHTML = data[i].Module;
                    newElement.classList.add("chart-row-item");
                    document.getElementById("tasks").appendChild(newElement);
                    var newList = document.createElement("ul");
                    newList.classList.add("chart-row-bars");
                    newList.id = data[i].Module + " " + tasks[z];
                    newList.setAttribute("onclick","openForm(this.id)");
                    document.getElementById("tasks").appendChild(newList);
                    var newItem = document.createElement("li");
                    newItem.innerHTML = tasks[z] + ":" + Percent[z];
                    newItem.classList.add("chart-li");
                    newItem.style.gridColumn = `${dateStart[z]}/${dateEnd[z]}`;
                    document.getElementById(data[i].Module + " " + tasks[z]).appendChild(newItem);
                }
            }
        }
    }
}

//submittion buttons
const submitRegistration = document.getElementById('SubmitRegistration');
try{
    submitRegistration.addEventListener("click",onRegistrationClick); //call function when submit is clicked when registering
}
catch(error){
    console.log("error as there is no registration button :::::", error) //this will throw an error when the registration is not on the 
}

const submitSignIn = document.getElementById('submitSignIn');
try{
    submitSignIn.addEventListener("click",onSignInClick);
}
catch(error){
    console.log("error as there is no login button  :::::",error)
}

const submitSemesterProfile = document.getElementById('submitSemester');
try{
    submitSemesterProfile.addEventListener("click",onSubmitProfileClick);
}
catch(error){
    console.log("error as there is no submit profile button  :::::",error)
}

const fileInput = document.getElementById('myFile');
try{
    readFile = function() {
        var reader = new FileReader();
        reader.onload = function () {
            globalThis.data = csvToArray(reader.result);
            populate();
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };
    fileInput.addEventListener("change",readFile);
}
catch(error){
    console.log("error as there is no file button  :::::",error)
}





//classes - semester, module, task

