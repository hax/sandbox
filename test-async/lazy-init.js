'use strict'

var instance = null

exports.getInstance = function () {

	if (instance) return instance

	return instance = new Promise(function (resolve, reject) {

		something(resolve)

	})
}
