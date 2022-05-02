var nameArray=[]
var emailArray=[];
var passwordArray=[];

function regFun(){
    document.getElementById("register").style.visibility="visible";
    document.getElementById("login").style.visibility="hidden";

    document.getElementById("registertab").style.backgroundColor="black";
    document.getElementById("logintab").style.backgroundColor="grey";
}
function loginFun(){
    document.getElementById("register").style.visibility="hidden";
    document.getElementById("login").style.visibility="visible";

    document.getElementById("logintab").style.backgroundColor="black";
    document.getElementById("registertab").style.backgroundColor="grey";
}
function register(){
    var name = document.getElementById("Rname").value;
    var email = document.getElementById("Remail").value;
    var password = document.getElementById("Rpass").value;
    var passwordRetype = document.getElementById("Rrepass").value;

    if (name == ""){
        alert("Name required.");
        return ;
    }
    else if (email == ""){
        alert("Email required.");
        return ;
    }
    else if (password == ""){
        alert("Password required.");
        return ;
    }
    else if (passwordRetype == ""){
        alert("Password required.");
        return ;
    }
    else if ( password != passwordRetype ){
        alert("Passwords don't match.");
        return;
    }
    else if(emailArray.indexOf(email) == -1){
        nameArray.push(name)
        emailArray.push(email);
        passwordArray.push(password);

        alert("Registration Successful");

        document.getElementById("Rname").value ="";
        document.getElementById("Remail").value ="";
        document.getElementById("Rpass").value="";
        document.getElementById("Rrepass").value="";
    }
    else{
        alert(email + " is already registered.");
        return ;
    }
}
function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    var i = emailArray.indexOf(email);

    if(emailArray.indexOf(email) == -1){
        if (email == ""){
            alert("Email required.");
            return ;
        }
        alert("Email does not exist.");
        return ;
    }
    else if(passwordArray[i] != password){
        if (password == ""){
            alert("Password required.");
            return ;
        }
        alert("Password does not match.");
        return ;
    }
    else {
        alert("Login Successful");
        document.getElementById("email").value ="";
        document.getElementById("pass").value="";
        document.location.href="home.html";
        return;
    }
}