
"use strict"




const dirSchema    = require('./dir-schema')
const childProcess = require('child_process')





const TEST_CASES = 1




const callGibbr = paths => {

	const gibbr = childProcess.spawn('gibbr', ['--size', '42', '--',  '-'])

	paths.forEach(fpath => {
		gibbr.stdin.write(fpath)
	})

	gibbr.stdin.end( )
}





const createDir = callback => {

	var schema = dirSchema.randomSchema(15, 0.05)

	console.log('test folder:')

	const paths = dirSchema.flattenDirs(process.cwd( ), schema)

	dirSchema.execSchema(process.cwd( ), schema)

	callGibbr(paths)

	setTimeout(( ) => {

		setTimeout(callback, 1 * 1000)

	}, 1 * 1000)

}

const loop = (fn, times) => {

	if (times !== 0) {
		fn(( ) => loop(fn, times - 1))
	}

}





loop(createDir, TEST_CASES)
