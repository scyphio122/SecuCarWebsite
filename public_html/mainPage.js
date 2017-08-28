
window.onload = function()
{
	addTrackRow([3, 0, 0, 0, 0, 0]);
	addTrackRow([4, 0, 0, 0, 0, 0]);
	removeTrackRow(3);
	initializeTrackTable();
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
			var trackId = cell.innerHTML;
			console.log("Row with trackId: " + trackId + " clicked");
			// Open Map modal
			openMapModal(trackId);
		};
	}
}

function addTrackRow(params)
{
	var table = document.getElementById("trackTable");
	
	var row = table.insertRow(-1);
	var title = table.getElementsByTagName("th");
	var cell;
	var cellString = "";
	for(i=0; i<title.length; i++)
	{
		cell = row.insertCell(i);
		cell.innerHTML = params[i];
		cellString += cell.innerHTML + "; ";
	}
	console.log("Adding row with parameters: " + cellString);
}

function removeTrackRow(index)
{
	var table = document.getElementById("trackTable");
	console.log("Removing row with track Id: " + index);
	//	TODO: Here should be HTTP request for removing track from database
	table.deleteRow(index);
}