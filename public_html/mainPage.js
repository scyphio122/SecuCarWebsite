var username;
var idUser;


window.onload = function()
{
	username = localStorage.getItem("username");
	idUser = localStorage.getItem("idUser");

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
			var cell = this.getElementsByTagName("td")[0];
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
	cell.innerHTML = params["serialNumber"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(4);
	cell.innerHTML = ((params["firmwareVersion"] >> 16) & 0xFF) + "." + ((params["firmwareVersion"] >> 8) & 0xFF) + "." + (params["firmwareVersion"] & 0xFF);
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(5);
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
		console.log("Row with deviceId: " + deviceId + " clicked");
		getTrackList(deviceId);
	};
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

	cell = row.insertCell(0);
	cell.innerHTML = index + 1;
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(1);
	cell.innerHTML = params["startDate"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(2);
	cell.innerHTML = params["startLocation"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(3);
	cell.innerHTML = params["endDate"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(4);
	cell.innerHTML = params["endLocation"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(5);
	cell.innerHTML = params["distance"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(6);
	cell.innerHTML = params["maneouverAssessment"];
	cellString += cell.innerHTML + "; ";
	row.onclick = function()
	{
		var cell = this.getElementsByTagName("td")[0];
		var index = cell.innerHTML - 1;
		document.getElementById("modalTrackId").innerHTML = "Track Number: " + (index + 1);

		var trackId = (tracksList[index])["idTrack"];
		console.log("Row with trackId: " + trackId + " clicked");

		clearSamplesTable();
		// Open Map modal
		openMapModal(trackId);
	};

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
	var marker = addMarker(_latLng[0], _latLng[1], sample);

	cell = row.insertCell(0);
	cell.innerHTML = marker.id;
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(1);
	cell.innerHTML = sample["timestamp"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(2);
	cell.innerHTML = sample["coordinates"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(3);
	cell.innerHTML = sample["speed"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(4);
	cell.innerHTML = sample["acceleration"];
	cellString += cell.innerHTML + "; ";

	cell = row.insertCell(5);
	cell.innerHTML = sample["azimuth"];
	cellString += cell.innerHTML + "; ";

	row.onclick = function()
	{
		var cell = this.getElementsByTagName("td")[0];
		var index = parseInt(cell.innerHTML);

		var marker = findMarkerById(index);
		marker.infoWindow.open(map, marker);

		console.log("Sample number: " + index + " clicked");
	};
}

function clearSamplesTable()
{
		markerUniqueId = 0;
		$("#sampleTable tr").not("#headerTr").remove();
}
