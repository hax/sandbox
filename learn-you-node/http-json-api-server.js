'use strict'

var http = require('http')
var parse = require('url').parse

var port = process.argv[2]

var routes = {

	'/api/parsetime': function (query) {
		if (query.iso) {
			var d = new Date(query.iso)
			console.log(d)
			return {
				hour: d.getHours(),
				minute: d.getMinutes(),
				second: d.getSeconds(),
			}
		}
	},
	'/api/unixtime': function (query) {
		if (query.iso) {
			return {
				unixtime: Date.parse(query.iso)
			}
		}
	}

}


http.createServer(function (request, res) {

	if (request.method === 'GET') {

		var urlObj = parse(request.url, true)

		var f = routes[urlObj.pathname]

		if (f === undefined) res.end(404)
		else {
			var result = f(urlObj.query)

			if (result) {
				res.writeHead(200, { 'Content-Type': 'application/json' })
				res.end(JSON.stringify(result))
			} else {
				res.end(400)
			}
		}

	} else {
		res.end(405)
	}

}).listen(port)