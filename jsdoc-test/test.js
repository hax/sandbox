/** @module test/sqrt */

/** @typedef {{errorCode: int}} MathError */


/**
 Math sqrt
 @param {number} x
 @returns {number}
 @throws {MathError}
 */
exports.sqrt = function sqrt(x) {
	var result = Math.sqrt(x)
	if (Number.isNaN(result)) throw {errorCode: 1001}
}

