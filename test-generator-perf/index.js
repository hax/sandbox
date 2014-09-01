'use strict'

function test(source) {

	function processChar(ch) {
		return ch.toUpperCase()
	}

	function processCharCode(code) {
		if (code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0)) {
			return String.fromCharCode(code + 'A'.charCodeAt(0) - 'a'.charCodeAt(0))
		} else {
			return String.fromCharCode(code)
		}
	}

	function iter1() {
		let s = ''
		for (let i = 0; i < source.length; i++) {
			s += processChar(source[i])
		}
		return s
	}

	function iter2() {
		let s = ''
		for (let i = 0; i < source.length; i++) {
			s += processCharCode(source.charCodeAt(i))
		}
		return s
	}

	function *gen1() {
		for (let i = 0; i < source.length; i++) {
			yield source[i]
		}
	}

	function *gen2() {
		for (let i = 0; i < source.length; i++) {
			yield source.charCodeAt(i)
		}
	}

	function iter3() {
		let s = ''
		let it = gen1()
		for (let ch of source) {
			s += processChar(ch)
		}
		return s
	}

	function iter4() {
		let s = ''
		let it = gen2()
		for (let code of it) {
			s += processCharCode(code)
		}
		return s
	}

	function benchmark(name, f) {
		var start = Date.now()
		for (let i = 0; i < 5; i++) f()
		console.log(name, Date.now() - start)
	}

	console.assert(iter2() === iter1())
	console.assert(iter3() === iter1())
	console.assert(iter4() === iter1())

	benchmark(1, iter1)
	benchmark(2, iter2)
	benchmark(3, iter3)
	benchmark(4, iter4)

}