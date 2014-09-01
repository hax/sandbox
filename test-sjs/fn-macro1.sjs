let function = macro {
	rule {
		$name:ident $args { $body ... }
	} => {
		function $name $args {
			console.log('call', $name)
			$body ...
		}
	}
}

export function
