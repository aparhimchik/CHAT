/*function initialize()
{
	var get = document.getElementById('getLocation');
	get.addEventListener('click', getMyLocation);
	
};
addEventListener('load', initialize);

function getMyLocation()
{
	navigator.geolocation.getCurrentPosition(showInfo, showError, geoConfig);
}

function showInfo(position)
{
	var location = document.getElementById('location');
	var data = '';
	//data += 'Широта ' + position.coords.latitude + '</br>';
	//data += 'Долгота ' + position.coords.longitude + '</br>';
	//data += 'Точность ' + position.coords.accuracy + '</br>';
	var mapurl = 'http://maps.google.com/maps/api/staticmap?center =' + position.coords.latitude + ',' + position.coords.longitude + ',+&zoom=18&size=400x400&sensor=false&markers='+ position.coords.latitude + ',' + position.coords.longitude;
	data += '<img src = "' + mapurl + '"/>';
	location.innerHTML = data;
}

function showError(error)
{
	alert('Ошибка ' + error.code + ' ' + error.message);
}

var geoConfig = {
	enableHeightAccuracy: true,
	timeout: 10000,
	maximumAge: 20000
}*/
// JS: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
//-----------------------------------------------------------------------------------------
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;

function initialize() {
  var mapOptions = {
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);