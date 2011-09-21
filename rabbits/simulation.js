function simulateRabbitsMultiplication(years) {
	'use strict'
	
	function RabbitPair() {
		this.live = true
		this.age = 0
	}
	RabbitPair.prototype = {
		older: function(year) {
			if (this.live) {
				this.age += year
				if (this.age >= 1.5 && this.age <= 5) this.breed()
				if (this.age >= 6) this.die()
			}
		},
		breed: function() {
			if (this.live) {
				rabbits.push(new RabbitPair())
			}
		},
		die: function() {
			this.live = false
		}
	}

	var rabbits = [new RabbitPair()]
	
	for (var t = 0; t < years; t += 0.5) {
		rabbits.forEach(function(rabbitPair) {
			rabbitPair.older(0.5)
		})
		console.log(t, ':', count())
	}
	
	return count()
	
	function count() {
		return rabbits.filter(function(rabbitPair) { return rabbitPair.live }).length
	}	
}