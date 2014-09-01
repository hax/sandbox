void function(){
	

	var re = /^[\t \u00A0\uFEFF\u2000-\u200A\u202F\u205F\u3000\u000B\u000C\u1680]*$/
	function match1(src) {
		return re.test(src)
	}

	function match2(src) {
		var i = 0, c
		while (c = src.charCodeAt(i)) {
			if (!(c === 9 || c === 0xA0 || c === 0xfeff ||
				c >= 0x2000 && c <= 0x200a || c === 0x202f ||
				c === 0x205f || c === 0x3000 ||
				c === 0xb || c === 0x1680)) return false
			i++
		}
	}

	console.time('test')
	for (var i = 0; i < 100000; i++) {
		match2('  \t\t \u3000 \r\n \n \u2008')
		//match2('aaaaaaabctest')
	}
	console.timeEnd('test')

}()