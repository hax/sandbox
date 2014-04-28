var http = require('http')
var fs = require('fs')

http.createServer(function(req, res){
	res.writeHeader(200, {
		'Content-Type': 'text/html',
	})
	var s = '<!doctype html><html><head><title>Test</title>' +
		'<style>div {border:1px solid; margin:1em;}</style>' + 
		'<script>' + fs.readFileSync('perf.js') + '</script>' +
		'</head><body><div>Test 1</div>' + 
		'<!--' + new Array(892).join(' ') + '-->'
	console.log(s.length)
	res.write(s)
	var h = setInterval(function(){
		res.write('<div>Test!</div>')
	}, 500)
	setTimeout(function(){
		clearInterval(h)
		res.end()
	}, 3000)

}).listen(3000)