var http = require('http')
var fs = require('fs')

var port = process.argv[2]
var path = process.argv[3]

var f = fs.createReadStream(path)

http.createServer(function (request, response) {

	f.pipe(response)

}).listen(port)