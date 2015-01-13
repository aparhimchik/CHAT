/* GET home page. */
exports.index = function(req, res){
/*var page;*/
	if(req.params.id)
	{
		index = req.params.id;
	}
	else
	{
		index = 'index';
	}
	var Maintexsts = require('../models/maintexsts').maintexsts;
	Maintexsts.findOne({'url': index}, function(err, text)
		{
			if(!text)
			{
				text = 
				{
					name: 'Добро пожаловать на сайт',
					body: 'Извините, страница не найдена'
				}
			}
console.log('req.session.user = ');
			console.log(req.session.user);
			res.render('index', { text: text});
		}		
	)	
};
