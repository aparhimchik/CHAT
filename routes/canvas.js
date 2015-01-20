exports.index = function(req, res)
{
	config = require('../config');
	scripts = config.get('scripts');
	scripts.push('/javascripts/draw.js')
	styles = config.get('styles');
	styles.push('/stylesheets/canvas.css');
	res.render('canvas', {scripts: scripts, styles: styles});
	
	console.log('canvas.jade подключен!!!')
}