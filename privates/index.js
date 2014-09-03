
function Private(cls) {

	var _privates = new WeakMap

	return function private(o) {
		if (_privates.has(o)) return _privates.get(o)
		var store = Object.create(null)
		_privates.set(o, store)
		return store
	}
}


var pa = Private(A)
var protected = Private()

function A(name) {
	pa(this).name = name
	protected(this).name = 'protected ' + name
}
A.prototype.getName = function () { return pa(this).name }


var a = new A('test')
console.log(a.getName())


var pb = Private(B)
function B(name) {
	A.call(this, name)
	pb(this).name = 'B:' + name
}
B.prototype = Object.create(A.prototype)
B.prototype.constructor = B
B.prototype.getBName = function () { return pb(this).name }
B.prototype.getPName = function () { return protected(this).name }

var b = new B('test')
console.log(b.getName(), b.getBName(), b.getPName())