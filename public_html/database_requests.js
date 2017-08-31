
var URL = "http://localhost:9090/secucar/"
var devicesList;
var tracksList;

function getUserData(idUser)
{
  http_get(URL + "get_user_data",
           {"idUser": parseInt(idUser)},
           function(response)
         {
           if (response["result"] == 1)
           {
             var data = {
                username: response["username"],
                name: response["name"],
                surname: response["surname"],
                email: response["email"],
                telephone: response["telephone"],
                city: response["city"],
                street: response["street"],
                homeNumber: response["homeNumber"],
                flatNumber: response["flatNumber"],
                postalCode: response["postalCode"]
             };

         			// Get some values from elements on the page:
         			var $form = $( "#userDataForm" );
         			$form.find( "input[name='username']" ).val(data["username"]);
         			$form.find( "input[name='name']" ).val(data["name"]);
         			$form.find( "input[name='surname']" ).val(data["surname"]);
         			$form.find( "input[name='email']" ).val(data["email"]);
         			$form.find( "input[name='telephone']" ).val(data["telephone"]);
         			$form.find( "input[name='city']" ).val(data["city"]);
         			$form.find( "input[name='street']" ).val(data["street"]);
         			$form.find( "input[name='homeNumber']" ).val(data["homeNumber"]);
         			$form.find( "input[name='flatNumber']" ).val(data["flatNumber"]);
         			$form.find( "input[name='postalCode']" ).val(data["postalCode"]);

             return data;
           }
           else {
             alert("Could not get user data");
             return {};
           }
         })
}


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
