
"use strict"




const dirSchema = require('./dir-schema')





const TEST_CASES = 10





const createDir = callback => {

	var schema = dirSchema.randomSchema(15, 0.05)

	console.log('test folder:')

	const paths = dirSchema.flattenDirs(process.cwd( ), schema)

	dirSchema.execSchema(process.cwd( ), schema)

	setTimeout(( ) => {

		setTimeout(callback, 1 * 1000)

	}, 1 * 1000)

}

const loop = (fn, times) => {

	if (times !== 0) {
		fn(( ) => loop(fn, times - 1))
	}

}





loop(createDir, 10)
