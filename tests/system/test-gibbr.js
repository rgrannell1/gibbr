
"use strict"




const dirSchema = require('./dir-schema')





const TEST_CASES = 10





const createDir = callback => {

	var schema = dirSchema.randomSchema(10, 0.05)

	console.log('test folder:')

	console.log(JSON.stringify(schema, null, 4))

	dirSchema.execSchema(process.cwd( ), schema)

	setTimeout(( ) => {

		setTimeout(callback, 5 * 1000)

	}, 5 * 1000)

}

const loop = (fn, times) => {

	if (times !== 0) {
		fn(( ) => loop(fn, times - 1))
	}

}





loop(createDir, 10)
