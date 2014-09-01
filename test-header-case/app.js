var http = require('http')

http.createServer(function(request, response){

	console.log(request.headers)
	response.end('ok')

}).listen(3000)