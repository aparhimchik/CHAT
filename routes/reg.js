var Users = require('../models/users').Users;
exports.index = function(req, res){
	res.render('reg');
}
exports.send = function(req, res)
{
	var username = req.body.username;
	var password = req.body.password;
	
	Users.authorise(username, password, function(err, user)
		{	
			/*if(err)
			{
				console.log(err);
			}
			else
			{	
				console.log(user._id);
			}*/
			
			req.session.user = user._id;
			
			console.log('req.session.user = ');
			console.log(req.session.user);
			res.redirect('/');			
		}		
	);
	//var users = new Users(
	//{
	//	username: username,
	//	password: password
	//});
	//users.save(function(req, res)
	//{
		//console.log(arguments);
		
	//});
	//console.log('username');
	//console.log('password');
	// вывод значения на консоль
	// может быть только одна строка res.end
	//res.end('username');
}
exports.logout = function(req, res)
{
	req.session.destroy();
	res.redirect('/');
}