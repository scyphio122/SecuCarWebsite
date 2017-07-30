var map;
var markerList = new Array();
var markerUniqueId = 0;

function initializeMap()
{
	var _initialLocation = {lat: 52.1795691, lng: 21.0567897}; //	Warszawa, ul. Egejska 13
	map = new google.maps.Map(document.getElementById("map"), 
	{
		zoom: 18,
		center: _initialLocation
	});

	var n = addMarker(_initialLocation.lat, _initialLocation.lng);
	n = addMarker(52.1801036, 21.0563075,20.03);
	
	var m = findMarker(n);
	//removeMarkerById(1);
}

function addMarker(latitude, longtitude)
{
	var _position = {lat: latitude, lng: longtitude};
	var _marker = new google.maps.Marker(
	{
		position: _position,
		map: map
	});
	var _m = 
	{
		id: markerUniqueId,
		marker: _marker
	}
	
	markerUniqueId = markerUniqueId + 1;
	
	markerList.push(_m);
	
	return _marker;
}	

function findMarker(marker)
{
	for(i=0; i<markerList.length; i++)
	{
		if(markerList[i].marker === marker)
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
		if(markerList[i].marker === marker)
		{
			markerList[i].marker.setMap(null);
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