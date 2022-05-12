//This is the javascript file inside of the public directory

console.log("start");

//make a fecth request!!

function onRegistrationClick(event){
    console.log('------reg-----');

    event.preventDefault();

    const values = {
        Forename : (document.getElementById("Forename").value),
        Surname : (document.getElementById("Surname").value),
        Email : (document.getElementById("Email").value),
        Password : (document.getElementById("Password").value)
    }

    const stringifyValues = JSON.stringify(values);

    fetch("/",{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: stringifyValues})
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
                location.href = 'home.html';
            }
            else{
                alert("Sign in unsuccessful")
        }})
        .catch(err => {
            console.log("Error Reading data " + err);
        });
    return;
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