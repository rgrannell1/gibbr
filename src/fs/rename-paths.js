
"use strict"





const is         = require('is')





const commons    = require('../commons/commons')
const renamePath = require('../fs/rename-path')





const renamePaths = args => {

	renamePaths.precond(args)

	args.stdin
		? commons.mapStdin(fpath => {
			renamePath(fpath, args.shouldNuke, args.size)
		})
		: args.files.forEach(fpath => {
			renamePath(fpath, args.shouldNuke, args.size)
		})

}

renamePaths.precond = args => {

	is.always.array(args.files)
	is.always.number(args.size)

}





module.exports = renamePaths
