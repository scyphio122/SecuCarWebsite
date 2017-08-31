var map;
var markerList = new Array();
var markerUniqueId = 0;

function initializeMap()
{
	var _initialLocation = {lat: 52.1795582, lng: 21.0562031}; //	Warszawa, ul. Egejska 13

	map = new google.maps.Map(document.getElementById("map"),
	{
		zoom: 18,
		center: _initialLocation
	});

	$( "div#map").children().css("background-color", "#565650");
}

function addMarker(latitude, longtitude, sample)
{
	var _position = {lat: parseFloat(latitude), lng: parseFloat(longtitude)};
	markerUniqueId = markerUniqueId + 1;

	var contentWindowString = "<div class='markerPopup'> " +
		'<div class="markerPopupTitle">Sample Details</div>' +
		 '<div class="markerPopupContent">' +
		 'Timestamp of sample: ' + sample["timestamp"] + '<br>' +
		 'Speed: ' + sample["speed"] + " km/h" + '<br>' +
		 'Acceleration: ' + sample["acceleration"] + " m/s^2" + '<br>' +
		 'Azimuth: ' + sample["azimuth"] +
		 '</div>' +
		 '<span class="icon-down-dir"></span>' +
		"</div>";

var infoBoxOptions = {
	content: contentWindowString,
	distableAytoPan: false,
	maxWidth: 0,
	pixelOffset: new google.maps.Size(-140, -15)
	,zIndex: null
	,boxStyle: {
		opacity: 11,
		width: "280px",
	}
	,closeBoxMargin: "10px 2px 2px 2px"
	,closeBoxURL: "https://www.google.com/intl/en_us/mapfiles/close.gif"
	,infoBoxClearance: new google.maps.Size(1, 1)
	,isHidden: false
	,alignBottom: true
	,pane: "floatPane"
	,enableEventPropagation: false
}

	var _infoWindow = new InfoBox(infoBoxOptions);

	var _icon = {
		path: "M 500,10 C 229.4,10 10,229.4 10,500 10,770.6 229.4,990 500,990 770.6,990 990,770.6 990,500 990,229.4 770.6,10 500,10 Z M 286.4,826.5 462.2,500 286.4,173.5 824.9,500 286.4,826.5 Z",
		fillColor: '#28a6f4',
		fillOpacity: 0.8,
		scale: 0.03,
		strokeColor: '#2977f4',
		strokeWeight: 1,
		rotation: (parseInt(sample["azimuth"]) - 90)
	}


	var _marker = new google.maps.Marker(
	{
		position: _position,
		map: map,
		icon: _icon,
		id: markerUniqueId,
		infoWindow: _infoWindow,
		timestamp: sample["timestamp"],
		speed: sample["speed"],
		acceleration: sample["acceleration"],
		azimuth: sample["azimuth"]
	});


	_marker.addListener('click', function() {
			_infoWindow.open(map, _marker);
			var id = _marker.id;
			console.log("Clicked sample nr: " + id);
	});

		// Event that closes the Info Window with a click on the map
	google.maps.event.addListener(map, 'click', function() {
		_infoWindow.close();
	});

	markerList.push(_marker);

	return _marker;
}

function findMarker(marker)
{
	for(i=0; i<markerList.length; i++)
	{
		if(markerList[i] === marker)
		{
			return markerList[i];
		}
	}

	return null;
}

function findMarkerById(Id)
{
	for(i=0; i<markerList.length; i++)
	{
		if(markerList[i].id === Id)
		{
			return markerList[i];
		}
	}

	return null;
}

function removeMarker(marker)
{
	for(i=0; i<markerList.length; i++)
	{
		if(markerList[i] === marker)
		{
			markerList[i].setMap(null);
			// Remove 1 element starting from i-th index
			markerList.splice(i, 1);
			return;
		}
	}
}

function removeMarkerById(id)
{
	for(i=0; i<markerList.length; i++)
	{
		if(markerList[i].id === id)
		{
			markerList[i].marker.setMap(null);
			// Remove 1 element starting from i-th index
			markerList.splice(i, 1);
			return;
		}
	}
}
