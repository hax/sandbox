var http = require('http')
var fs = require('fs')

var port = process.argv[2]

http.createServer(function (request, response) {

	if (request.method === 'POST') {
		request.on('data', function (data) {
			response.write(data.toString().toUpperCase())
		})
		request.on('end', function () {
			response.end()
		})
	} else {
		response.end(405)
	}

}).listen(port)