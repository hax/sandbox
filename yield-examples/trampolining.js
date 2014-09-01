void function () {
	'use strict'

	function isIterator(obj) {
		return obj != null && typeof obj.next === 'function'
	}

	function async(iter) {
		const iterators = [iter]
		const steps = function *() {
			//console.group(iter)
			let value
			while (iterators.length > 0) {
				let result = iterators[iterators.length - 1].next(value)
				if (result.done) {
					iterators.pop()
					yield value
				} else if (result.value === THUNK) {
					value = function () { value = steps.next() }
				} else if (isIterator(result.value)) {
					iterators.push(result.value)
				} else {
					value = result.value
					console.log(value)
				}
			}
			//console.groupEnd()
		}()
		steps.next()
	}

	function *get(url) {
		let RETURN = yield RETURN
		let req = new XMLHttpRequest()
		req.open('GET', url, true)
		req.onload = function (evt) {
			if (req.status >= 200 && req.status < 300) RETURN(req.response)
		}
	}

	async(function *() {

		console.log('waiting 1000')
		yield sleep(1000)
		console.log('ok')

	})


}()



