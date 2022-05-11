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

    const values = 
    {Email :document.getElementById("Email").value,
    Password: document.getElementById("Password").value}

    const stringifyValues = JSON.stringify(values);

    fetch("/SignIn",{ //getting the values to compare with outside of the public directory
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: stringifyValues})
        .then(res => {
            if (res!= null){ //res = email for the signed in account, if it does not have a value (aka null) then sign in was not successful !
                console.log("email----"+res);
                window.location.href = "another.html";
            }
            else{
                console.log("sign in was not successful, password or email was incorrect!");
            }
        });
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