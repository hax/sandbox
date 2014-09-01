'use strict'

function ImageViewer(e) {
	this.target = e
	this.images = []
	this._index = -1
	this.slots = ['prev', 'current', 'next']
	this.offsetX = 0
	detectGesture(e, ['tap', 'pan', 'flick'])
	//e.addEventListener('tap', this.close.bind(this))
	e.addEventListener('pan', function(evt){
		var dx = evt.detail.dx + this.offsetX
		var w = this.target.clientWidth
		//$log(dx, w)
		if (dx > w / 2) {
			if (this.prev()) {
				dx -= w
				this.offsetX -= w
				this.lastAction = 'prev'
			}
		} else if (dx < -w / 2) {
			if (this.next()) {
				dx += w
				this.offsetX += w
				this.lastAction = 'next'
			}
		}
		var transX = 'translateZ(0) translateX(' + dx + 'px)' 
		var figures = this.target.getElementsByTagName('figure')
		for (var i = 0, n = figures.length; i < n; i++) {
			var f = figures[i]
			var trans
			f.classList.add('transform')
			if (f.classList.contains('prev')) {
				trans = 'translateX(-100%) ' + transX
			} else if (f.classList.contains('next')) {
				trans = 'translateX(100%) ' + transX
			} else {
				trans = transX
			}
			//trans = 'translate3d(' + dx + 'px, 0, 0)'
			f.style.webkitTransform = trans
			f.style.transform = trans
		}
		evt.preventDefault()
	}.bind(this))
	e.addEventListener('panend', function(evt){
		var figures = this.target.getElementsByTagName('figure')
		for (var i = 0, n = figures.length; i < n; i++) {
			var f = figures[i]
			f.classList.remove('transform')
			f.style.webkitTransform = null
			f.style.transform = null
			setTimeout(function(f){
				f.style.webkitTransform = null
				f.style.transform = null
				$warn(getComputedStyle(f).webkitTransform)
				$warn(getComputedStyle(f).transform)			
			}.bind({}, f), 1000)
		}
		this.offsetX = 0
		setTimeout(function(){
			this.lastAction = null
		}.bind(this), 1)
		evt.preventDefault()
	}.bind(this))
	e.addEventListener('flick', function(evt){
		$log('flick!')
		if (evt.detail.dx > 0 && this.lastAction !== 'prev') this.prev()
		else if (evt.detail.dx < 0 && this.lastAction !== 'next') this.next()
	}.bind(this))
	e.querySelector('a[rel=up]').addEventListener('tap', this.close.bind(this))
	e.querySelector('a[rel=prev]').addEventListener('tap', this.prev.bind(this))
	e.querySelector('a[rel=next]').addEventListener('tap', this.next.bind(this))
}
Object.defineProperties(ImageViewer.prototype, {
	open: {value: function(index){
		this.target.hidden = false
		this.index = index || 0
	}},
	close: {value: function(){
		this.target.hidden = true
	}},
	prev: {value: function(){
		$log('prev', this.index)
		if (this.index <= 0) return false
		loopClass(this.target.childNodes, this.slots, -1)
		this.index--
		$log('prev', this.index)
		return true
	}},
	next: {value: function(){
		$log('next', this.index)
		if (this.index >= this.images.length - 1) return false
		loopClass(this.target.childNodes, this.slots, +1)
		this.index++
		$log('next', this.index)
		return true
	}},
	index: {
		get: function(){ return this._index },
		set: function(i){
			if (i >= 0 && i < this.images.length) {
				/*{
					var currImg = this.target.querySelector('figure.current img')
					if (currImg.src !== absoluteUrl(this.images[i].src)) {
						currImg.src = this.images[i].lowsrc
						var img = new Image()
						img.onload = function() {
							currImg.src = this.images[i].src
						}.bind(this)
						img.src = this.images[i].src
					}
				}
				if (i >= 1) {
					var prevImg = this.target.querySelector('figure.prev img')
					if (prevImg.src !== absoluteUrl(this.images[i - 1].src))
						prevImg.src = this.images[i - 1].lowsrc
				}
				if (i < this.images.length - 1) {
					var nextImg = this.target.querySelector('figure.next img')
					if (nextImg.src !== absoluteUrl(this.images[i + 1].src))
						nextImg.src = this.images[i + 1].lowsrc
				}*/
				this._index = i
			}
		}
	}
})

function absoluteUrl(url) {
	var a = document.createElement('a')
	a.href = url
	return String(a.href)
}

function loopClass(elements, classNames, offset){
	for (var i = 0, n = elements.length; i < n; i++) {
		if (elements[i].nodeType !== 1) continue
		/*var cl = elements[i].classList
		for (var j = 0, m = classNames.length; j < m; j++) {
			var old = classNames[j]
			if (cl.contains(old)) {
				cl.remove(old)
				var k = j - offset
				if (k < 0) {
					k += m
				} else if (k >= m) {
					k -= m
				}
				cl.add(classNames[k])
				//$log(cl, old, classNames[(j + m - offset) % m])
				break
			}
		}*/
		var c = elements[i].className
		$log(c)
		for (var j = 0, m = classNames.length; j < m; j++) {
			var old = classNames[j]
			if (c.indexOf(old) !== -1) {
				var k = j - offset
				if (k < 0) {
					k += m
				} else if (k >= m) {
					k -= m
				}
				c = c.replace(old, '') + ' ' + classNames[k]
				break
			}
		}
		elements[i].className = c
		$log(elements[i].className)
	}
}

