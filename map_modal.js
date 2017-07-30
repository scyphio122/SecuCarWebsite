var button = document.getElementById("button");

var modal_map = document.getElementById("modal_map");

// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close")[0];

button.onclick = function()
{
	modal_map.style.display = "block";
	var currentCenter = map.getCenter();  // Get current center before resizing
	google.maps.event.trigger(map, "resize");
	map.setCenter(currentCenter); // Re-set previous center
}

closeButton.onclick = function()
{
	modal_map.style.display = "none";
}

window.onclick = function()
{
	if (event.target == modal_map)
	{
		modal_map.style.display = "none";
	}
	
}