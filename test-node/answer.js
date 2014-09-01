var http = require('http');
var url = require('url');
var port = parseInt(process.argv[2]);

var handler = function(req, res) {
	var reqUrl = url.parse(req.url, true);
	var ret = {}
	var iso = reqUrl.query['iso'];
	if (!iso) {
		res.writeHead(400);
		res.end('no correct params');
		return;
	}
	var date = new Date(iso);
	if (reqUrl.pathname === '/api/parsetime') {
		ret.hour = date.getHours();
		ret.minute = date.getMinutes();
		ret.second = date.getSeconds();
	} else if (reqUrl.pathname === '/api/unixtime') {
		ret.unixtime = date.getTime();
	} else {
		res.writeHead(404);
		res.end('no such routes');
		return;
	}
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify(ret));
}

var server = http.createServer(handler);
server.listen(port);
