var userName;
var loginButton;
var loginForm;

window.onload = function()
{
	loginForm = document.getElementById("loginForm");
	
	loginForm.action = function()
	{
		onLoginSuccess("Konrad Traczyk");
	}
}
function onLoginSuccess(_userName)
{
	userName = _userName;
	
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
	var user = document.getElementById("")
}
