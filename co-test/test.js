'use strict';
/*global console*/
 
// co version 3.0.6
var co = require('co');
 
function task(callback) {
  setImmediate(function () { callback(null, 1) });
};
 
// 10000 will throw a 'Maximum call stack size exceeded' error
co(function *(){
  for (var i = 0, l = 50000; i < l; i++) {
    yield task;
  }
})(function(){
  console.log('Success!')
});
