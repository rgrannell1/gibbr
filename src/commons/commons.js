
"use strict"




const is        = require('is')
const path      = require('path')

const constants = require('../commons/constants')




const commons = { }





commons.mapStdin = callback => {

	var currentPath = [ ]

	process.stdin.on('readable', ( ) => {

		var chunk = process.stdin.read( )

		if (is.null(chunk)) {
			return
		}

		for (let ith = 0; ith < chunk.length; ++ith) {

			if (chunk[ith] === constants.charCodes.NEWLINE) {

				callback(Buffer(currentPath).toString( ))
				currentPath = [ ]

			} else {
				currentPath.push(chunk[ith])
			}

		}

	})

}





commons.pathExtension = fpath => {

	commons.pathExtension.precond(fpath)

	const basepath = path.basename(fpath)

	return basepath.indexOf('.') === -1
		? ''
		: '.' + basepath.slice(basepath.indexOf('.') + 1)

}

commons.pathExtension.precond = fpath => {

	is.always.string(fpath)

}





module.exports = commons
