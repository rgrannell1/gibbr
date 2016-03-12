
"use strict"




const dirSchema = require('./dir-schema')





const TEST_CASES = 10





for (let ith = 0; ith < TEST_CASES; ++ith) {

	var schema = dirSchema.randomSchema(10, 0.05)

	dirSchema.execSchema(process.cwd( ), schema)

	setTimeout(( ) => {



	}, 10 * 1000)

}
