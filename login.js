var userName;
var loginButton;
var loginForm;
var idUser;

window.onload = function()
{
	loginForm = document.getElementById("loginForm");
	
	loginForm.action = function()
	{
		submitLoginData();
	}
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
	var _user = document.getElementById("username");
	var _pass = document.getElementById("password");
	
	$.post( "login", { username: _user, password: _pass}, function( data ) {
		if (data.idUser == -1)
		{
			onLoginFail();
		}
		else
		{
			onLoginSuccess(data.idUser);
		}
	});
}
