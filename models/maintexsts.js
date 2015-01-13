var mongoose = require("../config/mongoose");
Schema = mongoose.Schema;

var schema = new Schema(
{
	name:
	{
		type: String,
		unique: true,
		required: true,
	},
	
	body:
	{
		type: String,
		unique: true,
	},
	
	url:
	{
		type: String,
		unique: true,
		required: true,
	}	
});

exports.maintexsts = mongoose.model("maintexsts", schema);
