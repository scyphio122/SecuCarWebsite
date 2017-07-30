var modal_map = document.getElementById("modal_map");

// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close")[0];

// Opening the modal
function openMapModal(trackId)
{
	// TODO: Here get the details about the track via HTTP request and fill the markers array
	
	// Display the modal window
	modal_map.style.display = "block";
	var currentCenter = map.getCenter();  // Get current center before resizing
	google.maps.event.trigger(map, "resize");
	map.setCenter(currentCenter); // Re-set previous center
}

// Close modal when user clics 'X' button
closeButton.onclick = function()
{
	modal_map.style.display = "none";
}

// Close the modal when user clicks outside of it
window.onclick = function()
{
	if (event.target == modal_map)
	{
		modal_map.style.display = "none";
	}
	
}