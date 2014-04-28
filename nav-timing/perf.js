
void function(window){
	'use strict'

	var now = typeof Date.now === 'function' ? Date.now : 
		function() { return new Date().getTime() }

	var p, t, t0 = now()
	if (p = global.performance && t = p.timing && t0 = t.navigationStart) return

	t = {domLoading: t0}

	if (window.addEventListener) {

		window.addEventListener('DOMContentLoaded', function(event){
			t.domContentLoadedEventStart = event.timeStamp || now()
		}, true)

		window.addEventListener('DOMContentLoaded', function(){
			t.domContentLoadedEventEnd = now()
		}, false)

		window.addEventListener('load', function(event){
			t.loadEventStart = event.timeStamp || now()
		}, true)

		window.addEventListener('load', function(){
			t.loadEventEnd = now()
		}, false)

		window.document.addEventListener('readystatechange', function(){
			t['dom' + this.readyState] = now()
		}, true)

	} else if (window.attachEvent) {

		var script = window.document.createElement('script')
		script.defer = true
		script.src = 'javascript:window.fireEvent("DOMContentLoaded")'

		window.attachEvent('load', function() {
			t.loadEventStart = now()
			window.attachEvent('load', function() {
				t.loadEventEnd = now()
			})
		})
	}
}(window)

var navTiming = {
	domLoading: Date.now()
}



	setTimeout(function(){
		var keys = Object.keys(performance.timing)
		if (keys.length === 0)
			keys = Object.keys(Object.getPrototypeOf(performance.timing))

		console.log(
			keys.sort(function(a, b){ 
				return performance.timing[a] - performance.timing[b] 
			}).map(function(x){ 
				return x + ':' + 
					(performance.timing[x] && 
					(performance.timing[x] - performance.timing.navigationStart)) 
			})
		)

		console.log(navTiming)
		console.log(
			Object.keys(navTiming).sort(function(a, b){ 
				return navTiming[a] - navTiming[b] 
			}).map(function(x){ 
				return x + ':' + 
					(navTiming[x] && 
					(navTiming[x] - performance.timing.navigationStart)) 
			})
		)
	})

function sleep(n) {
	var start = Date.now()
	while (Date.now() - start < n) {}
}
