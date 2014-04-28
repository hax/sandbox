
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.sendHeader();
	res.write('<!doctype html><head><title>Test</title></head><body><h1>Test</h1>')
	var handle = setInterval(function(){
		res.write('<div><script>document.write(Date.now() + "<br>")</script>Oh!</div>\n\n')
	}, 200)
	setTimeout(function(){
		clearInterval(handle)
		res.end()
	}, 2000)
};