var net = require('net')

var port = process.argv[2]

function pad0(s) {
	s += ''
	return s.length >= 2 ? s : ('0' + s).slice(-2)
}



net.createServer(function (socket) {
	var d = new Date()
	var s = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(pad0).join('-') + 
		' ' +
		[d.getHours(), d.getMinutes()].map(pad0).join(':')
	socket.end(s)
}).listen(port)