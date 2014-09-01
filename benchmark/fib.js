function fib(n) {
	if (n < 2) return n
	else return fib(n - 2) + fib(n - 1)
}

// prepare
for (var i = 0; i < 10; i++) fib(i)

console.time('fib')
for (var i = 0; i < 10; i++) fib(32)
console.timeEnd('fib')