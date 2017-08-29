var userName;
var loginButton;
var loginForm;
var idUser;
var registrationModal;
var registrationCloseButton;

window.onload = function()
{
	loginForm = document.getElementById("loginForm");
	loginButton = document.getElementById("loginButton");

	registrationModal = document.getElementById("registration_modal");
	// Get the <span> element that closes the modal
	registrationCloseButton = document.getElementById("registrationModalClose");

	// Close modal when user clics 'X' button
	registrationCloseButton.onclick = function()
	{
		registrationModal.style.display = "none";
	}

	document.getElementById("closeRegistrationButton").onclick = function()
	{
		registrationModal.style.display = "none";
	}

	document.getElementById("registerUserButton").onclick = openRegistrationModal;

}

function onLoginResponse(response)
{
	if (response["idUser"] < 0)
	{
			alert("Login failed.");
			window.location.href = "logon.html";
			return;
	}

	idUser = response["idUser"];
	window.location.href = "main_page.html";
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


//                     <!-- REGISTRATION -->
// Opening the modal
function openRegistrationModal()
{
	// Display the modal window
	registrationModal.style.display = "block";
}

function closeRegistrationModal()
{
	// Display the modal window
	registrationModal.style.display = "none";}

// Close the modal when user clicks outside of it
window.onclick = function()
{
	if (event.target == registrationModal)
	{
		registrationModal.style.display = "none";
	}
}
