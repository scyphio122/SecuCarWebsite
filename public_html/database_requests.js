
var URL = "http://localhost:9090/secucar/"
var devicesList;
var tracksList;

function addNewDevice(_deviceName, _serialNumber)
{
  if (idUser == -1)
  {
    alert("User not logged in!");
    return;
  }

  if (_deviceName == "")
  {
    _deviceName = "device" + (devicesList.length + 1);
  }

  http_get(URL + "add_device",
           {"idUser": idUser,
            "deviceName": _deviceName,
            "serialNumber": _serialNumber,
            "currentLocation": "",
            "firmwareVersion": "0"},
             function(response){
               if (response["result"] == 1)
               {
                 getDevicesList(idUser);
               }
               else {
                 alert("Could not add new device");
               }
             });
}

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

function editDevice(indexOfDevice)
{
  var idDevice = devicesList[indexOfDevice]["idDevice"];
  console.log("Changing device name of idDevice: " + idDevice);
  var devName = prompt("Please enter new device name", "NewDevice");

  http_get(URL + "change_device_name",
          {"idDevice": idDevice,
           "deviceName": devName},
           function(response){
             if (response["result"] == 1)
             {
               getDevicesList(idUser);;
             }
             else {
               alert("Error during changing the device name");
             }
           })
}

function deleteDevice(indexOfDevice)
{
  var idDevice = devicesList[indexOfDevice]["idDevice"];
  console.log("Deleting device id: " + idDevice);

  http_get(URL + "delete_device",
          {"idDevice": idDevice},
          function(response){
            if (response["result"] == 1)
            {
              getDevicesList(idUser);
            }
            else {
              alert("Could not delete device.");
            }
          })
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
