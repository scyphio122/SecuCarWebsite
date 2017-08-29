var username;
var password;
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

function login(_url, _username, _password)
{
	http_post(_url, {"username": _username, "password": _password}, onLoginResponse);
}

function onLoginResponse(response)
{
	if (response["idUser"] < 0)
	{
			alert("Login failed.");
			window.location.href = "index.html";
			return;
	}

	idUser = response["idUser"];
	localStorage.setItem("idUser", idUser);
	localStorage.setItem("username", username);

	window.location.href = "main_page.html";
}

function onForgotPasswd()
{

}

function RegisterUser(_username,
											_name,
											_surname,
											_email,
											_telephone,
											_city,
											_street,
											_homeNumber,
											_flatNumber,
											_postalCode,
											_password,
											_repeatPassword)
{
	if (_password != _repeatPassword)
	{
		alert("Passwords do not match, try again");
		return;
	}

	username = _username;
	password = _password;

	http_post("http://localhost:9090/secucar/register",
		 				{	"username": _username,
							"name": _name,
							"surname": _surname,
							"email": _email,
							"telephone": _telephone,
							"city": _city,
							"street": _street,
							"homeNumber": _homeNumber,
							"flatNumber": _flatNumber,
							"postalCode": _postalCode,
							"password": _password
						},
						onRegisterUserResponse
					);
}

function onRegisterUserResponse(response)
{
	var _result = response["result"];
	// If registration did not succeed
	if (_result == 0)
	{
		alert("Provided username already exists on the server. Try again");
		document.getElementById("registrationForm").reset();
		return;
	}
	else
	{
		login("http://localhost:9090/secucar/login", username, password);
	}
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
