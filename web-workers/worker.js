'use strict'

var ports = []
onconnect = function (e) {
	var port = e.source
	port.postMessage('start:' + typeof openDatabase)
	ports.push(port)
	checkPorts()
}

setInterval(checkPorts, 250)

function checkPorts() {
	var n = ports.length
	ports = ports.filter(function (p) {
		try {
			p.postMessage(n)
			return true
		} catch (e) {
			return false
		}
	})
}
