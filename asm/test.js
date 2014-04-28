function TestAsm(stdlib, foreign, heap) {
	'use asm'

	function fib(n){
		n = n|0
		if ((n|0) == 0) return 0
		else if ((n|0) == 1) return 1
		else return (
			(fib(n - 1|0)|0) + (fib(n - 2|0)|0)
		)|0
		return 0
	}

	function test(s) {


	}

	return {
		fib: fib,
		test: test
	}
}


function fib(n){
	n = n|0
	if ((n|0) == 0) return 0
	else if ((n|0) == 1) return 1
	else return (
		(fib(n - 1|0)|0) + (fib(n - 2|0)|0)
	)|0
	return 0
}
function fib1(n){
	if (n === 0) return 0
	else if (n === 1) return 1
	else return fib(n - 2) + fib(n - 1)
}



var start = Date.now()
console.log(fib(36))
console.log(Date.now() - start)

var start = Date.now()
console.log(fib1(36))
console.log(Date.now() - start)

var start = Date.now()
console.log(TestAsm().fib(36))
console.log(Date.now() - start)

