var http = require('http')

var urls = process.argv.slice(2)

urls.forEach(function (url, i) {
	http.get(url, function (response) {
		var s = ''
		response.on('data', function (data) {
			s += data.toString()
		})

		response.on('end', function () {
			done(i, s)
		})
	})	
})

var results = [], count = 0
function done(i, result) {
	results[i] = result
	count++
	if (count >= urls.length) {
		results.forEach(function (s) {
			console.log(s)
		})
	}
}
