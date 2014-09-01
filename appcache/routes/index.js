
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.offline = function(req, res){
	res.render('offline')
}

exports.category = function(req, res){
	if (req.params.id < 100) res.status(404)
	res.render('category', req.params)
}