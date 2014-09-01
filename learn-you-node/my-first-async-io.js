var fs = require('fs')

var path = process.argv[2]

fs.readFile(path, 'utf-8', function (err, data) {
	if (err) console.error(err)
	else console.log(data.split(/\n/).length - 1)
})