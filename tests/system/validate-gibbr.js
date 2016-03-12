
"use strict"




var fs     = require('fs')
var assert = require('assert')





console.log('validating system test output.')

fs.readdirSync('test0/test/').forEach(fpath => {

	assert(fpath.length >= 100, 'files not renamed')
	assert(fpath.indexOf('.foo.bar.baz') !== -1, 'extension not found.')

})

fs.readdirSync('test1/test0/').forEach(fpath => {

	assert(fpath.length >= 100, 'folder not renamed')

})

fs.readdirSync('test1/test1/').forEach(fpath => {

	assert(fpath.length >= 100, 'folder not renamed')

})
