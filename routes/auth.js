exports.cobinet = function(req, res, next)
{
	res.render('cobinet');
}
exports.send = function(req, res, next)
{
	console.log(req.files.book.name);
}