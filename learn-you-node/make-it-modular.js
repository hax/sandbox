var fs = require('fs')

module.exports = function (path, fileExt, callback) {

	var ext = '.' + fileExt

	function matchExt(file) {
		return file.slice(-ext.length) === ext
	}

	fs.readdir(path, function (err, list) {
		if (err) callback(err)
		else {
			callback(null, list.filter(matchExt))
		}
	})
}
