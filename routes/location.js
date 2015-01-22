exports.index = function(req, res)
{	
	config = require('../config');
	scripts = config.get('scripts');
	// JS: https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
	scripts.push('https://maps.googleapis.com/maps/api/js?v=3.exp');
	//--------------------------------------------------------------
	scripts.push('/javascripts/geolocation.js');
	styles = config.get('styles');
	styles.push('/stylesheets/geolocation.css');
	res.render('location', {scripts: scripts, styles: styles});
	
	console.log('location.jade подключен!!!')
}