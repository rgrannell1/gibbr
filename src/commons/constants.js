
"use strict"





const constants = {
	charCodes: {
		NEWLINE: 10
	},
	charset: {

	},
	package: require('../../package.json'),
	messages: {
		PRESERVE_ROOT: 'attempted to rename "/" without "--no-preserve-root" option'
	}
}




const letters             = 'abcdefghijklmnopqrstuvwxyz'
constants.charset.LETTERS = `${letters}${letters.toUpperCase( )}`





module.exports = constants
