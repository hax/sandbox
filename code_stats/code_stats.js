var lineBreak = /\r\n|\n|\r/

function analyze(s) {
	var keyStrokes = 0
	var lines = s.trim().split(lineBreak)
	var indents = 0
	var capsLock = false
	var re = /([A-Z]{2,})|([a-z]{2,})|([A-Z])|([a-z])|([~!@#$%^&*()_+{}|:"<>?])|([-0-9`=\\\[\];',./ \t])|(.)/g
	
	lines.forEach(function(line){
		var n = /^\s*/.exec(line)[0].length
		keyStrokes += Math.abs(n - indents)
		indents = n
		
		line = line.trim()
		var a
		while(a = re.exec(line)) {
			//console.log(a)
			if (a[1]) {
				if (!capsLock) {
					keyStrokes++
					capsLock = true
				}
				keyStrokes += a[0].length
			} else if (a[2]) {
				if (capsLock) {
					keyStrokes++
					capsLock = false
				}
				keyStrokes += a[0].length
			} else if (a[3]) {
				keyStrokes += capsLock ? 1 : 2
			} else if (a[4]) {
				keyStrokes += capsLock ? 2 : 1
			} else if (a[5]) {
				keyStrokes += 2
			} else if (a[6]) {
				keyStrokes += 1
			} else {
				console.log('Unknown char:', a[0])
				keyStrokes++
			}
		}
		
		keyStrokes++  // Enter
	})
	
	if (capsLock) {
		keyStrokes++
		capsLock = false
	}
	keyStrokes--
	return {
		chars: s.length,
		lines: lines.length,
		keyStrokes: keyStrokes
	}		
}

//console.log(analyze('WHAT!'))
console.assert(analyze('a, b, c').keyStrokes === 7)
console.assert(analyze('Just a Test').keyStrokes === 13)
console.assert(analyze('WHAT!').keyStrokes === 8)
console.assert(analyze('\tTest\n\t\tTest 2\n\t\t\tThis_is_a_TEST!\n\t\tEnd Test 2\n\tEnd Test\n').keyStrokes === 64)


exports.lineBreak = lineBreak
exports.analyze = analyze
