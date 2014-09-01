var connect = require('connect'),
	http = require('http'),
	stylus = require('stylus'),
	nib = require('nib')

var app = connect().use(connect.vhost('*.hax.test', function(req, res, next){
	var v = req.headers.host.split('.', 1)[0]
	return connect.createServer(
		stylus.middleware({
			src: __dirname + '/data/' + v,
			//firebug: true,
			linenos: true,

			compile: function(str, path){
				return stylus(str).
					set('filename', path).
					include(nib.path).
					include(__dirname + '/data/' + v + '/mixins')
			}
		}),
		connect.static(__dirname + '/data/' + v)
	)(req, res, next)
}))

http.createServer(app).listen(3005)