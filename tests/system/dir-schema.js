
"use strict"



const is     = require('is')
const fs     = require('fs')
const path   = require('path')
const mkdirp = require('mkdirp')




const dirSchema = { }





dirSchema.flattenDirs = (currentPath, fsSchema) => {

	if (is.object(fsSchema)) {

		return Object.keys(fsSchema).reduce((acc, dirName) => {

			return acc.concat(
				dirSchema.flattenDirs(path.join(currentPath, dirName), fsSchema[dirName]) )

		}, [ ])

	} else if (is.array(fsSchema)) {

		return fsSchema.reduce((acc, subSchema) => {
			return acc.concat(dirSchema.flattenDirs(currentPath, subSchema))
		}, [ ])

	} else if (is.string(fsSchema)) {
		return path.join(currentPath, fsSchema)
	}

}





dirSchema.execSchema = (currentPath, schema) => {

	const paths = dirSchema.flattenDirs(currentPath, schema)

	paths.forEach(fpath => {

		mkdirp.sync(path.dirname(fpath))
		fs.writeFileSync(fpath, 'xxx')

	})

}





dirSchema.randomName = ( ) => {


	var out          = ''
	var chars        = 'abcdefghijklmnopqrstuvwxyz'

	const LENGTH     = 5

	for (let ith = 0; ith < LENGTH; ++ith) {
		out += chars.charAt(Math.floor(Math.random( ) * chars.length))
	}

	return out

}

dirSchema.randomSchema = (perFolder, folderChance) => {

	const extensions = ['', '.txt', '.foo.bar.baz', '.pdf']
	const folderName = dirSchema.randomName( )
	const schema     = {
		[folderName]: [ ]
	}

	for (let ith = 0; ith < perFolder; ++ith) {

		const partName  = dirSchema.randomName( )
		const isFolder  = Math.random( ) < folderChance
		const extension = extensions[Math.floor(Math.random( ) * extensions.length)]

		schema[folderName].push(
			isFolder
				? dirSchema.randomSchema(perFolder, folderChance)
				: partName  + extension
		)

	}

	return schema

}




module.exports = dirSchema
