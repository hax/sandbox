module.exports = function(req, res, next){
	if (req.method === 'POST') {
		var body = {}
		for (var k in req.body) {
			body[decode(k)] = req.body[k]
		}
		//console.log('before', req.body)
		req.body = body
		//console.log('after', req.body)
	}

	var write = res.write
	var end = res.end

	res.write = function(){
		console.log('write')
		write.apply(res, arguments)
	}
	res.end = function(data){
		var type = res.get('Content-Type')
		if (type && type.slice(0, 9) === 'text/html') {
			//console.log('blur')
			data = data.replace(/(<input\s+[^>]*?\bname\s*=\s*)(?:(["'])(.*?)\2|([^\s>]+))/ig,
				function($0, $1, $2, $3, $4){
					return $1 + ($4 ? encode($4) : $2 + encode($3) + $2)
				})
		}
		end.call(res, data)
	}

	next()

}

function decode(s) {
	return s.split('').reverse().join('')
}

function encode(s) {
	return s.split('').reverse().join('')
}