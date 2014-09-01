let function = macro {
	rule {
		$name:ident $args { $body ... }
	} => {
		function $name $args {
			$body ...
			console.log('end', $name)
		}
	}
}

export function
