<?php


function Test() {
	$i = 0;
	yield 256;
	while (true) {
		yield $i;
		$i++;
	}
}

echo memory_get_usage(), "\n";

$list = head(Test(), 100000);
$list->next();



//$list = range(1, 100000);


function mul2($x) {
	return $x * 2;
}

function iter_map($iter, $callback) {
	foreach ($iter as $item) {
		yield $callback($item);
	}
}

function head($iter, $count) {
	$i = 0;
	foreach ($iter as $item) {
		if ($i < $count) yield $item;
		else break;
		$i++;
	}
}


foreach (iter_map($list, 'mul2') as $i) {
	$i;
}

$list->where(function($a){ return $a > 10})
	->take(10);

echo memory_get_usage();
