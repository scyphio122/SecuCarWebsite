var map;
var markerList = new Array();
var markerUniqueId = 0;
var markerIcon = "marker_icon.png";

function initializeMap()
{
	var _initialLocation = {lat: 52.1795582, lng: 21.0562031}; //	Warszawa, ul. Egejska 13

	map = new google.maps.Map(document.getElementById("map"),
	{
		zoom: 18,
		center: _initialLocation
	});
}

function addMarker(latitude, longtitude, sample)
{
	var _position = {lat: parseFloat(latitude), lng: parseFloat(longtitude)};
	markerUniqueId = markerUniqueId + 1;

	var _marker = new google.maps.Marker(
	{
		position: _position,
		map: map,
		icon: "marker_icon.png",
		id: markerUniqueId,
		timestamp: sample["timestamp"],
		speed: sample["speed"],
		acceleration: sample["acceleration"],
		azimuth: sample["azimuth"]
	});

	var contentWindowString = "<div class='markerPopup'> " +
		'<div class="markerPopupTitle">Sample Details</div>' +
		 '<div class="markerPopupContent">' +
		 'Timestamp of sample: ' + sample["timestamp"] + '<br>' +
		 'Speed: ' + sample["speed"] + " km/h" + '<br>' +
		 'Acceleration: ' + sample["acceleration"] + " m/s^2" + '<br>' +
		 'Azimuth: ' + sample["azimuth"] +
		 '</div>' +
		"</div>";

	var infoWindow = new google.maps.InfoWindow(
		{
			content: contentWindowString
		}
	);

	/*
	 * The google.maps.event.addListener() event waits for
	 * the creation of the infowindow HTML structure 'domready'
	 * and before the opening of the infowindow defined styles
	 * are applied.
	 */
	google.maps.event.addListener(infoWindow, 'domready', function() {

		 // Reference to the DIV which receives the contents of the infowindow using jQuery
		 var iwOuter = $('.gm-style-iw');

		 /* The DIV we want to change is above the .gm-style-iw DIV.
			* So, we use jQuery and create a iwBackground variable,
			* and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
			*/
		 var iwBackground = iwOuter.prev();

		 // Remove the background shadow DIV
		 iwBackground.children(':nth-child(2)').css({'display' : 'none'});

		 // Remove the white background DIV
		 iwBackground.children(':nth-child(4)').css({'display' : 'none'});

		 // Moves the infowindow 50px to the right.
		 iwOuter.parent().parent().css({left: '50px'});

		 // Moves the shadow of the arrow to the left margin
		iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 41px !important;'});

		// Moves the arrow to the left margin
		iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 41px !important;'});

		// Moves the arrow 76px to the left margin
		iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'background-color: #565650 !important; margin-top: 11px !important;'});
		iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'color: #565650; margin-top: 11px !important;'});

		var iwCloseBtn = iwOuter.next();

		// Apply the desired effect to the close button
		iwCloseBtn.css({
		  opacity: '1', // by default the close button has an opacity of 0.7
		  right: '-10px', top: '40px', // button repositioning
		  border: '7px solid #48b5e9', // increasing button border and new color
		  'border-radius': '13px', // circular effect
		  'box-shadow': '0 0 5px #3990B9' // 3D effect to highlight the button
		  });

		// The API automatically applies 0.7 opacity to the button after the mouseout event.
		// This function reverses this event to the desired value.
		iwCloseBtn.mouseout(function(){
		  $(this).css({opacity: '1'});
		});

	});

	_marker.addListener('click', function() {
			infoWindow.open(map, _marker);
			var id = _marker.id;
	});

		// Event that closes the Info Window with a click on the map
	google.maps.event.addListener(map, 'click', function() {
		infoWindow.close();
	});


	// var _m =
	// {
	// 	id: markerUniqueId,
	// 	marker: _marker
	// }

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
