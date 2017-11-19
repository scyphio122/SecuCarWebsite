var username;
var idUser;


window.onload = function()
{
	username = localStorage.getItem("username");
	idUser = localStorage.getItem("idUser");

	document.getElementById("username").innerHTML += " " + username + "   ";
	getDevicesList(idUser);
	//
	initializeTrackTable();

	document.getElementById("addDeviceButton").onclick = function()
	{
			document.getElementById("modal_add_device").style.display = "block";
	}

	// Close modal when user clics 'X' button
	document.getElementById("addDeviceCloseButton").onclick = function()
	{
			document.getElementById("modal_add_device").style.display = "none";
	}

	document.getElementById("cancelDeviceRegistrationButton").onclick = function()
	{
		document.getElementById("modal_add_device").style.display = "none";
	}


	document.getElementById("getUserData").onclick = function()
	{
			document.getElementById("user_data_modal").style.display = "block";

			getUserData(idUser, $( "#userDataForm" ));
	}

	// Close modal when user clics 'X' button
	document.getElementById("userDataModalClose").onclick = function()
	{
			document.getElementById("user_data_modal").style.display = "none";
			document.getElementById("changeUserData").innerHTML = "Change User Data";
			$('#userDataForm input').not("#changeUserData #closeUserDataButton").each(function(){
				$(this).prop('readonly', true);
			});
	}

	document.getElementById("closeUserDataButton").onclick = function()
	{
		document.getElementById("user_data_modal").style.display = "none";
		document.getElementById("changeUserData").innerHTML = "Change User Data";
		$('#userDataForm input').not("#changeUserData #closeUserDataButton").each(function(){
			$(this).prop('readonly', true);
		});
	}
}

// Close the modal when user clicks outside of it
window.onclick = function()
{
	if (event.target == document.getElementById("modal_add_device"))
	{
		document.getElementById("modal_add_device").style.display = "none";
	}
}


function initializeTrackTable()
{
	// TODO: Here fill the trackTable with tracks details via HTTP requests

	addRowHandlers();
}

function addRowHandlers()
{
	// Get table handle
	var table = document.getElementById("trackTable");
	// Get rows list from table
	var rows = table.getElementsByTagName("tr");

	for(i=0; i<rows.length; i++)
	{
		var row = rows[i];
		row.onclick = function()
		{
			var cell = row.getElementsByTagName("td")[0];
			var trackId = (tracksList[cell.innerHTML])["idTrack"];
			console.log("Row with trackId: " + trackId + " clicked");
			// Open Map modal
			openMapModal(trackId);
		};
	}
}

function addDeviceRow(index, params)
{
	var table = document.getElementById("devicesTable");

	var row = table.insertRow(-1);
	var title = table.getElementsByTagName("th");
	var cell;
	var cellString = "";

	cell = row.insertCell(0);
	cell.innerHTML = index + 1;
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(1);
	cell.innerHTML = params["deviceName"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(2);
	cell.innerHTML = params["currentLocation"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(3);
	cell.innerHTML = params["phoneNumber"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(4);
	cell.innerHTML = params["serialNumber"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(5);
	cell.innerHTML = params["firmwareVersion"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(6);
	var btn = document.createElement('input');
	btn.type = "image";
	btn.className = "btn";
	btn.value = "Edit";
	btn.name = index;
	btn.src = "Icons/edit2.png";
	btn.style.paddingTop = "5px";
	btn.style.marginRight = "5px";
	btn.style.marginLeft  = "5px";
	btn.style.width = "25px";
	btn.style.height = "25px";
	btn.style.display = "inline";
	btn.onclick = function() {
				editDevice(parseInt(btn.name));
	};
	cell.appendChild(btn);

	btn = document.createElement('input');
	btn.type = "image";
	btn.className = "btn";
	btn.value = "Delete";
	btn.name = index;
	btn.src = "Icons/delete.png";
	btn.style.width = "17px";
	btn.style.height = "17px";
	btn.style.marginRight = "5px";
	btn.style.display = "inline";
	btn.onclick = function() {
		deleteDevice(parseInt(btn.name));
	};
	cell.appendChild(btn);


	row.onclick = function()
	{
		var cell = this.getElementsByTagName("td")[0];
		var index = cell.innerHTML - 1;
		var deviceId = (devicesList[index])["idDevice"];
                currentDevice = deviceId;
		console.log("Row with deviceId: " + deviceId + " clicked");
		getTrackList(deviceId);
	};
}

function convertTimestampToDate(timestamp)
{
    console.log("Converting timestamp " + timestamp);
    var date = new Date(timestamp * 1000).toUTCString();
		date = date.slice(0, -3);
    console.log("Converted date is " + date);
    return date;
}

function clearDevicesList()
{
	$("#devicesTable tr").not("#headerTr").remove();
}

function addTrackRow(index, params)
{
	var table = document.getElementById("trackTable");

	var row = table.insertRow(-1);
	var title = table.getElementsByTagName("th");
	var cell;
	var cellString = "";

	var _latLng = params["startLocation"].split(';');
	_latLng[0] = _latLng[0].slice(1);
	_latLng[1] = _latLng[1].slice(0, -1);

	var _lat = _latLng[0].split('*');
	var _lng = _latLng[1].split('*');

	var _latitude = "<div>" + _lat[0] + "&deg" + _lat[1] + "</div>";
	var _longtitude = "<div>" + _lng[0] + "&deg" + _lng[1] + "</div>";


	cell = row.insertCell(0);
	cell.innerHTML = index + 1;
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(1);
	cell.innerHTML = convertTimestampToDate(params["startDate"]);
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(2);
	cell.innerHTML = _latitude + "\n" + _longtitude;//params["startLocation"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(3);
	if (params["endDate"] != "0")
	{
	cell.innerHTML = convertTimestampToDate(params["endDate"]);
	cellString += cell.innerHTML + "; ";
	}
	
	_latLng = params["endLocation"].split(';');
	if (_latLng != "")
	{
	_latLng[0] = _latLng[0].slice(1);
	_latLng[1] = _latLng[1].slice(0, -1);

	_lat = _latLng[0].split('*');
	_lng = _latLng[1].split('*');

	_latitude = "<div>" + _lat[0] + "&deg" + _lat[1] + "</div>";
	_longtitude = "<div>" + _lng[0] + "&deg" + _lng[1] + "</div>";
	}
	else {
			_latitude = "";
			_longtitude = "";
	}

	cell = row.insertCell(4);
	cell.innerHTML = _latitude + "\n" + _longtitude;
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(5);
	cell.innerHTML = params["distance"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(6);
	cell.innerHTML = params["trackAssessment"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(7);
        cell.style.width = '25px';
        for (var i=0; i < (row.cells.length - 1); i++)
        {
            row.cells[i].onclick = function()
	    {
		var cell = this.parentNode.getElementsByTagName("td")[0];
		var index = cell.innerHTML - 1;
		document.getElementById("modalTrackId").innerHTML = "Track Number: " + (index + 1);

		var trackId = (tracksList[index])["idTrack"];
		console.log("Row with trackId: " + trackId + " clicked");

		clearSamplesTable();
		// Open Map modal
		openMapModal(trackId);
	    };
        }

        var btn = document.createElement('input');
	btn.type = "image";
	btn.className = "btn";
	btn.value = "DeleteTrack";
	btn.name = params["idTrack"];
	btn.src = "Icons/delete.png";
	btn.style.width = "17px";
	btn.style.height = "17px";
	btn.style.display = "inline";
	btn.onclick = function() {
		deleteTrack(parseInt(btn.name));
	};
	cell.appendChild(btn);

	console.log("Adding row with parameters: " + cellString);
}

function removeTrackRow(index)
{
	var table = document.getElementById("trackTable");
	console.log("Removing row with track Id: " + index);
	//	TODO: Here should be HTTP request for removing track from database
	table.deleteRow(index);
}

function clearTracksTable()
{
	$("#trackTable tr").not("#headerTr").remove();
}

function addSampleRow(index, sample)
{
	var table = document.getElementById("sampleTable");
	var row = table.insertRow(-1);
	var title = table.getElementsByTagName("th");
	var cell;
	var cellString = "";

	var _latLng = sample["coordinates"].split(';');
	var _lat = _latLng[0].split('*');
	var _lng = _latLng[1].split('*');

	var _latitude = "<div>" + _lat[0] + "&deg" + _lat[1] + "</div>";
	var _longitude = "<div>" + _lng[0] + "&deg" + _lng[1] + "</div>";

	var marker = addMarker(_latLng[0], _latLng[1], sample);

	cell = row.insertCell(0);
	cell.innerHTML = marker.id;
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(1);
	cell.innerHTML = convertTimestampToDate(sample["timestamp"]);
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(2);
	cell.innerHTML = _latitude + "\n" + _longitude;
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(3);
	cell.innerHTML = (sample["speed"] / 100.0).toFixed(2);
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(4);
	cell.innerHTML = parseFloat(sample["acceleration"]*0.000598755).toFixed(2);
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(5);
	cell.innerHTML = (sample["azimuth"] / 100.0).toFixed(2);
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(6);
	cell.innerHTML = sample["numOfSattellites"] ;
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(7);
	cell.innerHTML = (sample["hdop"]/100.0).toFixed(2);
	cellString += cell.innerHTML + "; ";

	row.onclick = function()
	{
		var cell = this.getElementsByTagName("td")[0];
		var index = parseInt(cell.innerHTML);

		var marker = findMarkerById(index);
		marker.infoWindow.open(map, marker);

		console.log("Sample number: " + index + " clicked");
	};

	$('#sampleTable tr').not('#headerTr').on({
	    mouseenter: function () {
	        var cellIndex = $(this).index();
					console.log("Entered row: " + cellIndex);
					var marker = findMarkerById(cellIndex);
					marker.infoWindow.open(map, marker);
	    },
	    mouseleave: function () {
	        var cellIndex = $(this).index();
					console.log("Left row: " + cellIndex);
					var marker = findMarkerById(cellIndex);
					marker.infoWindow.close();
	    }
	});
}

function clearSamplesTable()
{
		markerUniqueId = 0;
		$("#sampleTable tr").not("#headerTr").remove();
}
