var fs = require('fs')

var lsByExt = require('./make-it-modular')

var path = process.argv[2]
var ext = process.argv[3]

lsByExt(path, ext, function (err, files) {
	files.forEach(function (f) {
		console.log(f)
	})
})
