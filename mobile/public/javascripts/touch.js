'use strict'

//tap, dbltap, hold
//pan, drag, swipe/slide, flick/fling, pinch/stretch/spread, turn/rotate

function detectGesture(e, gestures) {

	var touches = {}
	var detectors = gestures.map(function(gestureType){
		return GestureDetector[gestureType]
	})

	function gc(id) {
		setTimeout(function(){
			delete touches[id]
		}, 100)
	}

	e.addEventListener('touchstart', function(evt){
		for (var list = evt.changedTouches, n = list.length, i = 0; i < n; i++) {
			var touch = list[i]
			touches[touch.identifier] = {
				start: {x: touch.screenX, y: touch.screenY, t: evt.timeStamp},
				moves: [],
				end: null,
				cancel: null
			}
		}
		for (var i = 0; i < detectors.length; i++){
			detectors[i].ontouchstart(evt, touches)
		}
		// most Android browsers need calling preventDefault()
		// to allow future touchmove events
		evt.preventDefault()
	})
	e.addEventListener('touchend', function(evt){
		for (var list = evt.changedTouches, n = list.length, i = 0; i < n; i++) {
			var touch = list[i]
			touches[touch.identifier].end = {
				x: touch.screenX, y: touch.screenY, t: evt.timeStamp
			}
		}
		for (var i = 0; i < detectors.length; i++)
			detectors[i].ontouchend(evt, touches)
		gc(touch.identifier)
	})
	e.addEventListener('touchmove', function(evt){
		for (var list = evt.changedTouches, n = list.length, i = 0; i < n; i++) {
			var touch = list[i]
			var moves = touches[touch.identifier].moves
			
			// Android will generate touchmove events even no move
			if (moves.length > 0
				&& moves[moves.length - 1].x === touch.screenX
				&& moves[moves.length - 1].y === touch.screenY
			) return

			moves.push({
				x: touch.screenX, y: touch.screenY, t: evt.timeStamp
			})
		}
		for (var i = 0; i < detectors.length; i++)
			detectors[i].ontouchmove(evt, touches)

		evt.preventDefault()
	})
	e.addEventListener('touchcancel', function(evt){
		for (var list = evt.changedTouches, n = list.length, i = 0; i < n; i++) {
			var touch = list[i]
			touches[touch.identifier].cancel = {
				x: touch.screenX, y: touch.screenY, t: evt.timeStamp
			}
		}
		for (var i = 0; i < detectors.length; i++)
			detectors[i].ontouchcancel(evt, touches)
		gc(touch.identifier)
	})
}


var noop = function(){}

function Motion(p1, p2) {
	this.p1 = p1
	this.p2 = p2
}
Object.defineProperties(Motion.prototype, {
	dt: {get: function(){ return this.p2.t - this.p1.t }},
	dx: {get: function(){ return this.p2.x - this.p1.x }},
	dy: {get: function(){ return this.p2.y - this.p1.y }},
	dist: {get: function(){
		var dx = this.dx, dy = this.dy
		return Math.sqrt(dx * dx + dy * dy)
	}},
	vx: {get: function(){ return this.dx / this.dt }},
	vy: {get: function(){ return this.dy / this.dt }},
	v: {get: function(){ return this.dist / this.dt }}
})

var TapDetector = {
	TAP_TIME_THRESHOLD: 200, //ms
	TAP_MOTION_THRESHOLD: 16, //px
	ontouchstart: function(evt){
	},
	ontouchend: function(evt, touches){
		if (evt.changedTouches.length === 1) {
			var touch = touches[evt.changedTouches[0].identifier]
			var m = new Motion(touch.start, touch.end)
			if (m.dt < this.TAP_TIME_THRESHOLD &&
				m.dist < this.TAP_MOTION_THRESHOLD
			) {
				var e = new CustomEvent('tap', {
					bubbles: true, cancelable:true,
					detail: m
				})
				var result = evt.target.dispatchEvent(e)
				if (!e.defaultPrevented) {
					if (evt.target.click) evt.target.click()
				}
				evt.preventDefault()
				return result
			}
		}
	},
	ontouchmove: noop,
	ontouchcancel: noop
}
var PanDetector = {
	PAN_MOTION_THRESHOLD: 10, //px, 2.7mm
	ontouchstart: noop,
	ontouchend: function(evt, touches){
		var touch = touches[evt.changedTouches[0].identifier]
		if (evt.touches.length === 0 && touch.pan) {
			var m = new Motion(touch.start, touch.end)
			var e = new CustomEvent('panend', {
				bubbles: true,
				detail: m
			})
			var result = evt.target.dispatchEvent(e)
			if (e.defaultPrevented) evt.preventDefault()
			return result
		}
		evt.preventDefault()
	},
	ontouchmove: function(evt, touches){
		var touch = touches[evt.changedTouches[0].identifier]
		if (evt.touches.length === 1) {
			var m = new Motion(touch.start, touch.moves[touch.moves.length - 1])
			if (!touch.pan) {
				if (m.dist > this.PAN_MOTION_THRESHOLD) touch.pan = m
			}
			if (touch.pan) {
				var e = new CustomEvent('pan', {
					bubbles: true, cancelable:true, 
					detail: m
				})
				var result = evt.target.dispatchEvent(e)
				if (e.defaultPrevented) evt.preventDefault()
				return result
			}
		}
	},
	ontouchcancel: noop
}
var FlickDetector = {
	FLICK_VELOCITY_THRESHOLD: 0.5, //px/ms
	FLICK_TIME_THRESHOLD: 100, //ms

	ontouchstart: noop,
	ontouchend: function(evt, touches){
		var touch = touches[evt.changedTouches[0].identifier]
		if (evt.changedTouches.length === 1) {
			var m = new Motion(
				touch.moves.length >= 1 ?
					touch.moves[touch.moves.length - 1] :
					touch.start,
				touch.end)
			if (m.dist === 0) {
				if (m.dt > this.FLICK_TIME_THRESHOLD) touch.flick = null
			} else {
				touch.flick = m.v > this.FLICK_VELOCITY_THRESHOLD ? m : null
			}
		} else {
			touch.flick = null
		}
		if (touch.flick) {
			var e = new CustomEvent('flick', {
				bubbles: true, cancelable:true, 
				detail: touch.flick
			})
			return evt.target.dispatchEvent(e)
		}
	},
	ontouchmove: function(evt, touches){
		var touch = touches[evt.changedTouches[0].identifier]
		if (evt.touches.length === 1) {
			var m = new Motion(
				touch.moves.length >= 2 ?
					touch.moves[touch.moves.length - 2] :
					touch.start,
				touch.moves[touch.moves.length - 1])
			//$warn(m.dx, m.dy, m.dt, m.v)
			if (m.dist === 0) { // Android 在 touchend 之前会产生一个位移为 0 的 touchmove
				if (m.dt > this.FLICK_TIME_THRESHOLD) touch.flick = null
			} else {
				touch.flick = m.v > this.FLICK_VELOCITY_THRESHOLD ? m : null
			}
		} else {
			touch.flick = null
		}
	},
	ontouchcancel: noop
}
var GestureDetector = {
	tap: TapDetector,
	pan: PanDetector,
	flick: FlickDetector
}

//detectGesture(window, ['tap', 'flick', 'pan'])

