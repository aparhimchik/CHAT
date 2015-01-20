exports.index = function(req, res)
{
	config = require('../config');
	// локальные стили и скрипты определяем прямо в контроллере
	scripts = config.get('scripts');
	scripts.push('/javascripts/player.js');
	styles = config.get('styles');
	styles.push('/stylesheets/video.css');
	res.render('video', {scripts: scripts, styles: styles});
	
	console.log('video.jade подключен!!!')
	/*в video.jade содержимое body index.html*/
}