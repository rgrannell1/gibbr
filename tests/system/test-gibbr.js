
"use strict"




const dirSchema = require('./dir-schema')





console.log(JSON.stringify(
	dirSchema.randomSchema(10, 0.05),
	null,
	4
))
