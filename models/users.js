var crypto = require('crypto');
var async = require('async');
var mongoose = require('../config/mongoose');
Schema = mongoose.Schema;
var schema = new Schema(
{
	username:
	{
		type: String,
		unique: true,
		require: true
	},
	hashedPassword:
	{
		type: String,
		require: true
	},
	salt:
	{
		type: String,
		require: true
	},
	created:
	{
		type: Date,
		default: Date.now,
		require: true
	}	
});
schema.methods.encryptPassword = function(password)
{
	return crypto.createHmac('sha1',//способ шифрования
							 this.salt
	).update(password)
	.digest('hex');
}
schema.virtual('password')
	.set(function(password)
	{	
		this._plainPassword = password;
		this.salt = Math.random() + '';
		
		this.hashPassword = this.encryptPassword(password);
	})
	.get(function()
	{
		return this._plainPassword;
	});

schema.methods.checkPassword = function(password)
{
	return this.encryptPassword(password)===this.hashedPassword;
}
schema.statics.authorise = function(username, password, callback)
{
	var User = this
	async.waterfall(
	[
		function(callback)
		{	
			User.findOne(
			{username: username},
			callback)
		},
		function(user, callback)
		{
			if(user)
			{
				if(user.checkPassword(password))
				{
					callback(null, user);
				}
				else
				{
				console.log('Неправильный пароль!!!')
					//callback(null, user);
				}
			}
			else
			{
				var user = new User
				(
					{
						username: username,
						password: password
					});
					user.save(function(err)
					{
						callback(null, user);
					}
				)
			}
		}
	], callback)
}
exports.Users = mongoose.model('Users', schema);