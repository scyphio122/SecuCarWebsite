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
	  var latSplitted = latitude.split("*");
	  var lngSplitted = longtitude.split("*");

		if (latSplitted[1][latSplitted[1].length - 1] == 'S')
		{
			latSplitted[0] *= -1;
		}

		if (lngSplitted[1][lngSplitted[1].length - 1] == 'W')
		{
			lngSplitted[0] *= -1;
		}

		latSplitted[1] = latSplitted[1].slice(0, -1);
		lngSplitted[1] = lngSplitted[1].slice(0, -1);


		var floatLat = parseFloat(latSplitted[0]) + parseFloat(latSplitted[1]/60);
		var floatLng = parseFloat(lngSplitted[0]) + parseFloat(lngSplitted[1]/60);
		var _position = {lat: parseFloat(floatLat), lng: parseFloat(floatLng)};


		var _icon = {
			//path: "M 500,10 C 229.4,10 10,229.4 10,500 10,770.6 229.4,990 500,990 770.6,990 990,770.6 990,500 990,229.4 770.6,10 500,10 Z M 286.4,826.5 462.2,500 286.4,173.5 824.9,500 286.4,826.5 Z",
			path: "M0 -490C-270.6 -490 -490 -270.6 -490 0 -490 270.6 -270.6 490 0 490 270.6 490 490 270.6 490 0 490 -270.6 270.6 -490 0 -490zM-213.60000000000002 326.5 -37.80000000000001 0 -213.60000000000002 -326.5 324.9 0 -213.60000000000002 326.5z",
			anchor: new google.maps.Point(20,20),
			fillColor: '#28a6f4',
			fillOpacity: 0.8,
			scale: 0.015,
			strokeColor: '#2977f4',
			strokeWeight: 1,
			rotation: (parseInt(sample["azimuth"]/100) - 90)
		}

		markerUniqueId = markerUniqueId + 1;
		var _marker = new google.maps.Marker(
		{
			position: _position,
			map: map,
			icon: _icon,
			id: markerUniqueId,
			infoWindow: null,
			timestamp: convertTimestampToDate(sample["timestamp"]),
			speed: sample["speed"]/100,
			acceleration: sample["acceleration"]/100,
			azimuth: sample["azimuth"]/100
		});

		var contentWindowString = "<div class='markerPopup'> " +
			'<div class="markerPopupTitle">Sample Details</div>' +
			 '<div class="markerPopupContent">' +
			 'Timestamp of sample: <br>' + convertTimestampToDate(sample["timestamp"]) + '<br>' +
			 'Speed: ' + (sample["speed"]/100.0).toFixed(2) + " km/h" + '<br>' +
			 'Acceleration: ' + parseFloat(sample["acceleration"]*0.000598755).toFixed(2) + " m/s^2" + '<br>' +
			 'Assessment: ' + parseFloat(sample["manouverAssessment"]/100).toFixed(2) + "%" + '<br>' +
			 '<div> Azimuth: ' + (sample["azimuth"]/100).toFixed(2) + "&deg</div>"
			 '</div>' +
			 '<span class="icon-down-dir"></span>' +
			"</div>";

		var infoBoxOptions = {
				map: map,
				content: contentWindowString,
				position: _marker.position,
				shadowStyle: 1,
				padding: 0,
				backgroundColor: '#565650',
				borderRadius: 8,
				arrowSize: 10,
				borderWidth: 1,
				borderColor: '#2c2c2c',
				disableAutoPan: true,
				hideCloseButton: false,
				arrowPosition: 30,
				backgroundClassName: 'phoney',
				arrowStyle: 2,
				closeSrc: "Icons/closeInfoBubble.png"
		}

	var _infoWindow = new InfoBubble(infoBoxOptions);

	_marker.infoWindow = _infoWindow;

	_marker.addListener('click', function() {
			_infoWindow.open(map, _marker);
			var id = _marker.id;
			console.log("Clicked sample nr: " + id);
	});

		_marker.addListener('mouseover', function() {
			var id = _marker.id;
			console.log("Moved over sample nr: " + id);
			var rows = $('tr', document.getElementById("sampleTable"));
			rows.eq(id).addClass('row_hover');
	});

	_marker.addListener('mouseout', function() {
		var id = _marker.id;
		console.log("Left sample nr: " + id);
		var rows = $('tr', document.getElementById("sampleTable"));
		rows.eq(id).removeClass('row_hover');
	});


		// Event that closes the Info Window with a click on the map
	google.maps.event.addListener(map, 'click', function() {
		_infoWindow.close();
	});

	if (markerUniqueId == 1)
	{
		map.setCenter(_marker.getPosition());
	}

	markerList.push(_marker);
	return _marker;
}

function removeMarkers()
{
		for (var i = 0; i < markerList.length; i++)
		{
			markerList[i].setMap(null);
		}
}

function displayMarkers(map)
{
		for (var i = 0; i < markerList.length; i++)
		{
			markerList[i].setMap(map);
		}
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
