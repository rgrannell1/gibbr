
"use strict"





const path      = require('path')
const commons   = require('../commons/commons')
const constants = require('../commons/constants')
const random    = require('../commons/random')





const randomName = { }

randomName.directory = (fpath, size) => {

	const basename = random.fromCharSet(constants.charset.LETTERS, size)
	return path.join(path.dirname(fpath), basename)

}

randomName.file = (fpath, size) => {

	const basename = random.fromCharSet(constants.charset.LETTERS, size) + commons.pathExtension(fpath)
	return path.join(path.dirname(fpath), basename)

}





module.exports = randomName
