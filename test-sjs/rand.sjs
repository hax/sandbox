macro rand {
	rule {
		$x:ident
	} => {
		var $x = Math.random().toString()

	}
}

export rand
