void function(global){
	var PERF = 'performance',
		TIM = 'timing',
		NS = 'navigationStart'
	if (
			global[PERF] && 
			global[PERF][TIM] && 
			global[PERF][TIM][NS]
		) {
		return
	}
	if (
			global[PERF] && 
			global[PERF][TIM] && 
			global[PERF][TIM][NS]
		) {
		return
	}
}(window)