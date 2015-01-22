var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

var routes = require('./routes');
var users = require('./routes/user');
var checkAuth = require('./utils/checkAuth');
var auth = require('./routes/auth');

var reg  = require('./routes/reg');
var chat = require('./routes/chat');
var video = require('./routes/video');
var canvas = require('./routes/canvas');
var location = require('./routes/location');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//insert data
var Maintexsts = require('./models/maintexsts').maintexsts;

var maintexsts = new Maintexsts(
{
	/*name: 'Главная',
	body: 'Добро пожаловать на сайт электронной библиотеки',
	url: 'index'*/
	/*name: 'О нас',
	body: 'Электронная библиотека создана с целью хранения, чтения и поиска интересующих Вас книг',
	url: 'about'*/
	name: 'Новости',
	body: 'Последние новости компании',
	url: 'news'
});

maintexsts.save(function(err, user)
{
	console.log('ok');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.bodyParser(
{
	KeepExtentions: true,
	uploadDir: 'public/tmp' // создание папки для загрузки
}))
app.use(cookieParser());
// нужно для создания сесии
app.use(express.session(
{	
	secret: 'werr879',
	key: 'sid'
}))

app.use(function(req, res, next)
{
// c помощью locals можно передавать любые глобальные переменные
	res.locals =
		{
			scripts : config.get('scripts'),
			styles: config.get('styles'),
			userid : req.session.user
		}
		next();
})
//-----------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);
app.get('/reg', reg.index);
app.get('/cobinet', checkAuth, auth.cobinet);
app.get('/logout', checkAuth, reg.logout);
app.get('/chat', chat.index);
app.get('/video', video.index);
app.get('/canvas', canvas.index);
app.get('/location', location.index);
//id всегда  должна быть последней
app.get('/:id', routes.index);

//post запросы
app.post('/reg', reg.send);
app.post('/cobinet', checkAuth, auth.send);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

//app.listen(3000);
http.listen(config.get('port'));
module.exports = app;
