
"use strict"



const is   = require('is')
const fs   = require('fs')
const path = require('path')




const dirSchema = { }





dirSchema.execSchema = (currentPath, fsSchema) => {

	if (is.object(fsSchema)) {

		Object.keys(fsSchema).forEach(dirPath => {

			fs.mkdir(dirPath, err => {

				if (err) {
					throw err
				} else {
					dirSchema.execSchema(path.join(currentPath, dirPath), fsSchema[dirPath])
				}

			})

		})

	} else if (is.array(fsSchema)) {

		fsSchema.map(subSchema => {
			dirSchema(currentPath, subSchema)
		})

	} else if (is.string(fsSchema)) {

		fs.writeFile(fsSchema, '.', err => {
			throw err
		})

	}

}



dirSchema.randomName = ( ) => {

	var LENGTH = 25

	var out    = ''
	var chars  = 'abcdefghijklmnopqrstuvwxyz'

	for (let ith = 0; ith < LENGTH; ++ith) {
		out += chars.charAt(Math.floor(Math.random( ) * chars.length))
	}

	return out

}

dirSchema.randomSchema = (perFolder, folderChance) => {

	const folderName = dirSchema.randomName( )
	const schema     = {
		[folderName]: [ ]
	}

	for (let ith = 0; ith < perFolder; ++ith) {

		const partName = dirSchema.randomName( )
		const isFolder = Math.random( ) < folderChance

		schema[folderName].push(
			isFolder
				? dirSchema.randomSchema(perFolder, folderChance)
				: partName
		)

	}

	return schema

}




module.exports = dirSchema
