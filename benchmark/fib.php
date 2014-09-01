<?
function fib($n) {
	if ($n < 2) return $n;
	else return fib($n - 2) + fib($n - 1);
}

// prepare
for ($i = 0; $i < 10; $i++) fib($i);

$start = microtime(true);
for ($i = 0; $i < 1; $i++) fib(32);
$end = microtime(true);
echo $end - $start, "\n";