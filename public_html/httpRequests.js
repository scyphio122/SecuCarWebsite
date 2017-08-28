
function http_post(_url, _arguments, _successCallback)
{
  var _args = JSON.stringify(_arguments);
  console.log("Args passed to POST request: " + _args);
  // Send the data using post
  $.ajax({
    url: _url,
    type: "POST",
    dataType: "json", // expected format for response
    contentType: "application/json", // send as JSON
    data: _args ,

    complete: function() {
      //called when complete
    },
    success: function(msg) {
      var json = JSON.parse(msg.getResponse());
      console.log("Returning JSON is: " + json)
      _successCallback(json);
    },
    error: errorCallback,
    });
}

function errorCallback(response)
{
  console.log("Request error");
}
