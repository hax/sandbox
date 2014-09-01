
function async(generator) {
	var promise = Promise.resolve()
	var iter = generator()
	var x = {}
	while (true) {
		x = iter.next(x.value)
		if (x.done) break
	}
}

function sleep(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms)
	})
}

function get(url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest
		xhr.open('GET', url)
		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(this)
			} else {
				reject(this)
			}
		}
		xhr.onerror = reject
		xhr.send()
	})
}


console.log('test')
async(function *() {
	yield sleep(1000)
	console.log(yield 1)
	yield sleep(1000)
	console.log(yield 2)
})

/*
async(function *() {

	for (var i = 0; i < 10000; i++) {
		yield sleep(100)
		yield i
	}

})*/
