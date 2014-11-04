var primes = [2]

function prime(n) {
	if (n < primes.length) return primes[n]
	for (var i = primes.length; i <= n; i++) {
		var x = primes[i - 1] + 1
		while (!isPrime(x)) x++
		primes[i] = x
	}
	return primes[n]
}

function isPrime(x) {
	if (!Number.isInteger(x) || x <= 1) throw new Error()
	if (x <= primes[primes.length - 1]) return primes.indexOf(x) >= 0
	var max = Math.sqrt(x)
	if (Number.isInteger(max)) return false
	max = Math.floor(max)
	var i = 0
	while (true) {
		if (primes[i] > max) return true
		if (x % primes[i] === 0) return false
		i++
	}
}

//Dedicated Worker
onmessage = answer

//Shared Worker
onconnect = function (e) {
	var port = e.ports[0]
	port.onmessage = answer
}

function answer(e) {
	this.postMessage(prime(parseInt(e.data, 10)))
}
