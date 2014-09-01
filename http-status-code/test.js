'use strict'
var http = require('http'), fs = require('fs')

var server = http.createServer(function (req, res) {
	console.log(req.url, req.method)
	
	if (req.method === 'GET' && req.url === '/client') {
		res.writeHead(200, {'Content-Type': 'text/html'})
		fs.createReadStream('test.html').pipe(res)
	} else if (req.method === 'POST' && req.url === '/test') {
		res.writeHead(201, {'Location': '/ok'})
		res.end()
	} else if (req.url === '/ok') {
		res.writeHead(200)
		res.end('ok')
	} else {
		res.writeHead(400)
		res.end()
	}
})

server.listen(3001)