var X = 16


var daySeconds = 24 * 3600

var d = new Date('2014-01-01').getTime() - 8 * 3600 * 1000
var a = []
for (var i = 0; i < 300; i++) {
	a.push(d)
	d += daySeconds * 1000
}

a.sort(function (a, b) {
	return digits(a, X) - digits(b, X)
})
console.log(a.slice(0, 10).map(function (d) { return [d.toString(X), new Date(d)] }))


function digits(n, m) {
	return n.toString(m).replace(/0*$/, '').length
}
