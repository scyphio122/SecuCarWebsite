var userName;
var loginButton;
var loginForm;
var idUser;

window.onload = function()
{
	loginForm = document.getElementById("loginForm");
	loginButton = document.getElementById("loginButton");
}
function onLoginSuccess(userId)
{
	idUser = userId;
	window.location.href = "main_page.html";
}

function onLoginFail()
{
	window.location.href = "logon.html";
}

function onForgotPasswd()
{

}

function onRegisterUser()
{

}

function submitLoginData()
{
    //var _user = document.getElementById("username");
    //var _pass = document.getElementById("password");
    //httpGetAsync('/login?username='+_user+'&password='+_pass, onLoginFail());

}


function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
