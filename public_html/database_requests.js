
var URL = "http://localhost:9090/secucar/"
var devicesList;
var tracksList;

function getDevicesList(_idUser)
{
  if (_idUser < 0)
  {
      console.log("User not logged in");
      return;
  }
  var obj = {"idUser": parseInt(_idUser)};
  http_get(URL + "get_devices_list", obj, _onDevicesListReceived);
}

function _onDevicesListReceived(response)
{
  clearDevicesList();
  if (response["result"] == 1)
  {
    devicesList = response["devices"];

    for (var i = 0; i < devicesList.length; i++)
    {
      addDeviceRow(i, devicesList[i]);
    }
  }
}

function getTrackList(_idDevice)
{
    console.log("Getting track list for device: " + _idDevice);

    http_get(URL + "list_tracks",
            {"idDevice": _idDevice },
            onReceivedTrackList);
}

function onReceivedTrackList(response)
{
  clearTracksTable();
  if (response["result"] == 1)
  {
    tracksList = response["tracks"];

    for (var i = 0; i < tracksList.length; i++)
    {
      addTrackRow(i, tracksList[i]);
    }
  }
}

function getSamplesList(_idTrack)
{
    console.log("Getting samples list for track: " + _idTrack);

    http_get(URL + "get_track_details",
            {"idTrack": _idTrack},
            onReceivedTrackDetails);
}

function onReceivedTrackDetails(response)
{
  if (response["result"] == 1)
  {
    var sampleList = response["samples"];

    clearSamplesTable();
    for (var i = 0; i < sampleList.length; i++)
    {
      // if (i == 0)
      // {
      //   var _latLng = sampleList[i]["coordinates"].split(';');
      //   var _initialLocation = {lat: parseFloat(_latLng[0]), lng: parseFloat(_latLng[1])}; //	Wa
      //   map.center = _initialLocation;
      // }
      addSampleRow(i, sampleList[i]);
    }
  }
}
