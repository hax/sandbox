var fs = require('fs')
var analyze = require('./code_stats.js').analyze

analyzeFile(fs.realpathSync(process.argv[2]))

function analyzeFile(path) {
	fs.stat(path, function(err, stats) {
		if (err) throw err
		if (stats.isFile()) {
			fs.readFile(path, 'utf-8', function(err, data) {
				if (err) throw err
				//console.log(data)
				console.log(path)
				console.info(analyze(data))
			})
		} else if (stats.isDirectory()) {
			fs.readdir(path, function(err, files) {
				if (err) throw err
				files.
					filter(function(name){
						return name.charAt(0) !== '.' &&
							name.slice(-4) !== '.txt' &&
							name !== 'README'
					}).
					map(function(name){return path + '/' + name}).
					forEach(analyzeFile)
			})
		}
	})
}
