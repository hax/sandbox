'use strict'

const koa	= require('koa'),
	statics	= require('koa-static'),
	body	= require('koa-better-body'),
	ngrok	= require('ngrok'),
	qrTerm	= require('qrcode-terminal')

const app = koa()

const handlers = {
	redirect: function *() {
		const status =
			(this.method === 'POST' || this.method === 'PUT' ?
			this.request.body : this.query).status || 302
		if (status >= 300 && status < 400) {
			this.status = status
			this.redirect('/trace')
		} else this.throw(404)
	},
	trace: function *() {
		this.body = this.request
	},
	tunnel: function *() {
		this.body = tunnelURL
	}
}

app.use(body()).
	use(function *(next) {
		const handler = handlers[this.path.slice(1)]
		if (handler) yield handler
		else yield next
	}).
	use(statics('public'))

const port = parseInt(process.env.npm_package_config_port, 10)
app.listen(port)

let tunnelURL
ngrok.connect(port, function (err, url) {
	if (err) throw err
	tunnelURL = url
	console.log('Tunnel URL:', url)
	qrTerm.generate(url)
})