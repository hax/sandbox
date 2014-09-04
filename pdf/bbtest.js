function SetTitleText() { out('set title', arguments) }
function SetIcon1Text() { out('icon1', arguments) }
function SetIcon2Text() { out('icon2', arguments) }
function SetIcon3Text() { out('icon3', arguments) }

document.addEventListener('DOMContentLoaded', function() {
	var stdout = document.getElementById('stdout')
	if (!stdout) {
		stdout = document.createElement('pre')
		stdout.id = 'stdout'
		document.body.appendChild(stdout)
		var s = stdout.style
		s.position = 'absolute'
		s.right = s.bottom = '0'
		s.background = 'black'
		s.color = 'white'
		s.font = '16px monospace'
	}
	out('dom ready')
	//throw 'test!'
}, false)

out = function() {
	out.buffer.push(Array.prototype.join.call(arguments, ' '))
}
out.buffer = []
out.flush = function() {
	if (out.buffer.length > 0) {
		var stdout = document.getElementById('stdout')
		if (stdout) {
			stdout.innerHTML += '' + out.buffer.join('\n') + '\n\n'
			out.buffer = []
		}
	}
}
setInterval(out.flush, 500)


function goFirst() {
	historyGo(history.length)
}
function historyGo(i) {
	out(i)
	history.go(-i)
	setTimeout(function() { historyGo(i - 1) }, 1000)
}

function onBookshelf() {
	out('bookshelf', history.length)
	goFirst()
}
function sub_onBookshelf() {
	out('sub bookshelf')
	history.go(-history.length)
}
function onInteract() {
	location.reload()
}
function onBack() {
	history.back()
}
