void function(w){
	'use strict'

	if (!('CustomEvent' in w)) {
		$debug('patch CustomEvent')
		w.CustomEvent = function CustomEvent(type, evtInitDict) {
			var evt = w.document.createEvent('CustomEvent')
			evt.initCustomEvent(type, 
				evtInitDict.bubbles, 
				evtInitDict.cancelable, 
				evtInitDict.detail)
			return evt
		}
	}

}(window)
