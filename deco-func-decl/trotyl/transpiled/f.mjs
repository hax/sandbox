import { g } from './g';

function deco(fn) {
  return function (x) {
    return fn(x) + 100;
  }
}

function f ( x ) {
  return x + 1;
}

var f_decorated
export function get_f() {
  if (!f_decorated) {
    f = deco(f)
    f_decorated = true
  }
  return f
}

console.log(g(1));
