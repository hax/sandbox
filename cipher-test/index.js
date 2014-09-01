void function () {
	'use strict'

	function encrypt(x, y, key) {
		var k = key[3]
		var l0 = key[2]
		var l1 = key[1]
		var l2 = key[0]
		for (var i = 0; i < 21;) {
			x = (x << 9 | x >>> 7) + y & 0xffff ^ k
			y = (y << 2 | y >>> 14) & 0xffff ^ x
			l0 = (l0 << 9 | l0 >>> 7) + k & 0xffff ^ i
			k = (k << 2 | k >>> 14) & 0xffff ^ l0
			i++
			x = (x << 9 | x >>> 7) + y & 0xffff ^ k
			y = (y << 2 | y >>> 14) & 0xffff ^ x
			l1 = (l1 << 9 | l1 >>> 7) + k & 0xffff ^ i
			k = (k << 2 | k >>> 14) & 0xffff ^ l1
			i++
			x = (x << 9 | x >>> 7) + y & 0xffff ^ k
			y = (y << 2 | y >>> 14) & 0xffff ^ x
			l2 = (l2 << 9 | l2 >>> 7) + k & 0xffff ^ i
			k = (k << 2 | k >>> 14) & 0xffff ^ l2
			i++
		}
		x = (x << 9 | x >>> 7) + y & 0xffff ^ k
		y = (y << 2 | y >>> 14) & 0xffff ^ x
		return [x, y]
	}

	var r = encrypt(0x6574, 0x694c, [0x1918, 0x1110, 0x0908, 0x0100])
	console.log(r[0], r[1], 0xa868, 0x42f2)

	//#define R(x,y,k) (x=RCS(x,8), x+=y, x^=k, y=LCS(y,3), y^=x)
	
	function speck128(x, y, a, b) {
		for (var i = 0; i < 32; i++) {
			x = RCS(x, 8) + y ^ A
			y = LCS(y, 3) ^ x

			R(x, y, A)
			R(B, A, i)
		}
	}
}()


