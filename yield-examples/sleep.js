import Promise from 'my-promise'

export function sleep(sec) {
	return new Promise(function (resolve) {
		setTimeout(resolve, sec * 1000)
	})
}
