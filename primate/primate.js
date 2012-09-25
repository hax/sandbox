void function(){
	var guard = ['a', 'input', 'button']
	if ('addEventListener' in window) {
		window.addEventListener('touchstart', eventLogger, true)
		window.addEventListener('touchend', eventLogger, true)
		window.addEventListener('touchupdate', eventLogger, true)
		window.addEventListener('mousedown', eventLogger, true)
		window.addEventListener('mouseup', eventLogger, true)
		window.addEventListener('mousemove', eventLogger, true)
		window.addEventListener('keydown', eventLogger, true)
		window.addEventListener('keyup', eventLogger, true)

		window.addEventListener('click', myGuard, true)
		//window.addEventListener('DOMActivate', myGuard, false)
	} else if ('attachEvent' in window) {
		window.attachEvent('touchstart', eventLogger)
		window.attachEvent('touchend', eventLogger)
		window.attachEvent('touchupdate', eventLogger)
		window.attachEvent('mousedown', eventLogger)
		window.attachEvent('mouseup', eventLogger)
		window.attachEvent('mousemove', eventLogger)
		window.attachEvent('keydown', eventLogger)
		window.attachEvent('keyup', eventLogger)
		window.attachEvent('onclick', myGuard)
	}

	function myGuard(evt){
		//console.log('click', evt.target.tagName)
		if (evt.target.nodeType !== 1) return
		if (guard.indexOf(evt.target.tagName.toLowerCase()) === -1) return
		if (evt.target.className.split(/\s+/).indexOf('noguard') != -1) return

		if (!isTrusted(evt)) logRisk()
	}

	function isTrusted(evt) {
		if (evt.isTrusted === false) return false
		switch (evt.type) {
			case 'click':
			case 'DOMActivate':
				var r1 = records[records.length - 1]
				//var r2 = records[records.length - 2]
				//var r3 = records[records.length - 3]
				//console.log(r1.type, r1.target)
				if (!r1 || evt.target !== r1.target) return false
		}
		return true
	}

	var records = []
	function eventLogger(evt) {
		if (evt.isTrusted === false) return
		records.push({
			type: evt.type,
			target: evt.target,
			clientX: evt.clientX,
			clientY: evt.clientY,
			button: evt.button,
			keyCode: evt.keyCode
		})
		//console.log(records)
		setTimeout(function(){
			records.pop()
		}, 1)
	}

	function logRisk(){
		console.log('What r u doing?')
	}
}()