console.log(
	process.argv.slice(2).map(function (arg) {
		return parseInt(arg, 10)
	}).reduce(function (a, b) {
		return a + b
	}, 0)
)