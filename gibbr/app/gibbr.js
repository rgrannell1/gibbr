
"use strict"





require('babel-polyfill')





const is = require('is')





const constants   = require('../commons/constants')
const renamePaths = require('../fs/rename-paths')





const gibbr = rawArgs => {

	const args = gibbr.preproccess(gibbr.validate(rawArgs))

	if (args['--version']) {
		console.log(constants.pkg.version)
	} else {
		return renamePaths(args)
	}

}





gibbr.validate = args => {
	return args
}

gibbr.preproccess = rawArgs => {

	try {

		var size = parseInt(rawArgs['--size'], 10)

	} catch (err) {
		throw new Error('failed to parse "--size" argument.')
	}

	if (size !== size) {
		throw Error('"--size" was NaN.')
	}

	if (size < 0) {
		throw Error('"--size" must be larger than zero.')
	}

	is.always.boolean(rawArgs['--no-preserve-root'])

	return {
		stdin:      rawArgs['-'],
		files:      rawArgs['<path>'],
		size:       size,
		shouldNuke: rawArgs['--no-preserve-root']

	}

}





module.exports = gibbr
