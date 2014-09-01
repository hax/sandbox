var fs = require('fs')

var s = fs.readFileSync(process.argv[2], 'utf-8')
console.log(s.split(/\n/).length - 1)