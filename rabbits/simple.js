function countRabbits(years) {
	'use strict'
	
	var freq = 2/* per year */, 
		gStart = freq * 1, 
		gEnd = gStart + freq * 4,
		dead = freq * 6

	var rabbits = [1], lives = 1

	for (var n = freq * years, t = 0; t < n; t++) {
		var newborns = sum(rabbits.slice(gStart, gEnd))
		rabbits.unshift(newborns)
		lives += newborns - (rabbits[dead] || 0)
		console.log(t / 2, ':', newborns, '/', lives)
	}
	
	return lives
	
	function sum(a) {
		return a.reduce(function(a, b){return a + b}, 0)
	}
}


