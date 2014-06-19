#!/usr/bin/env node

const fs   = require('fs')
const path = require('path')






randomString = function (len) {
	/*
		generate a random alphanumeric string
		of a fixed length.
	*/

	const alphanumbers =
		'abcdefghijklmnopqrstuvwxyz'
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		'0123456789'

	var out = ''

	for (var ith = 0; ith < len; ith++) {
		// append a random character to the output.
		out += alphanumbers.charAt(Math.random() * alphanumbers.length)
	}

	return out
}





renameFile = function (file) {

}





module.exports = renameFile
