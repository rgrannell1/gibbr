
"use strict"




const is         = require('is')
const fs         = require('fs')
const path       = require('path')
const randomName = require('../fs/random-name')
const constants  = require('../commons/constants')





const processPath = (fpath, size, err, stats) => {

	const resolvedPath = path.resolve(fpath)

	if (err) {

		console.error(err.message)
		return

	}

	if (resolvedPath === '/' && !shouldNuke) {

		console.error(constants.messages.PRESERVE_ROOT)
		process.exit(1)

	}

	const renamed = stats.isDirectory( )
		? randomName.directory(fpath, size)
		: randomName.file     (fpath, size)

	fs.rename(fpath, renamed, err => {

		if (err) {
			console.error(err.message)
		}

	})

}





const renamePath = (fpath, shouldNuke, size) => {

	renamePath.precond(fpath, shouldNuke, size)

	fs.lstat(fpath, processPath.bind({ }, fpath, size))

}

renamePath.precond = (path, shouldNuke, size) => {

	is.always.string(path)
	is.always.boolean(shouldNuke)
	is.always.number(size)

}





module.exports = renamePath
