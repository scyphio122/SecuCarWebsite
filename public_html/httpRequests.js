
function http_post(_url, _arguments, _successCallback)
{
  var _args = JSON.stringify(_arguments);
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
      _successCallback(msg);
    },
    error: errorCallback,
    });
}

function http_get(_url, _arguments, _successCallback)
{
  //var _args = JSON.stringify(_arguments);
  var _args = _arguments;
  // Send the data using post
  $.ajax({
    url: _url,
    type: "GET",
    dataType: "json", // expected format for response
    contentType: "application/json", // send as JSON
    data: _args ,

    complete: function() {
      //called when complete
    },
    success: function(msg) {
      _successCallback(msg);
    },
    error: errorCallback,
    });
}

function errorCallback(response)
{
  console.log("Request error");
}
