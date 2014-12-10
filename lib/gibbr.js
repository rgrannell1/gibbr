#!/usr/bin/env node

const is = require('is')



const redo = function (fn, num) {

	var out = []

	for (var ith = 0; ith < num; ++ith) {
		out[ith] = fn()
	}

	return out

}

const randomLetters = function (num) {

	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

	return redo(function (_) {
		return charset.charAt( Math.floor(Math.random() * charset.length) )
	}, num)
	.join('')

}





const parseArgs = function (args) {

	const len = args.len

	if (len !== len) {
		throw Error("len was a non-numeric value (" + arg.len + ").")
	}

	if (!is.boolean(args.verbose)) {
		throw TypeError("verbose was not a boolean.")
	}

	if (!is.boolean(args.nuke)) {
		throw TypeError("nuke was not a boolean.")
	}

	if (args.files.indexOf('-') != -1 && args.files.length > 1) {
		throw Error("can't read files from stdin and arguments at once.")
	}





	return {
		nuke:    args.nuke,
		verbose: args.verbose,
		len:     parseInt(args.len, 10)
	}

}





const mapStandardInput = function (callback) {

	const newline   = 10
	var currentPath = [] // should max out at 4096 bytes.

	process.stdin.on('readable', function () {

		const chunk = process.stdin.read()

		if (is.null(chunk)) {
			return
		}

		for (var ith = 0; ith < chunk.length; ++ith) {

			// how does this work for filenames with escaped newlines?
			if (chunk[ith] === newline) {

				callback(Buffer(currentPath).toString())
				currentPath = []

			} else {
				currentPath.push(chunk[ith])
			}

		}

	})

}





const main = function (args) {

	parseArgs(args)

	if (args.version) {
		console.log('gibbr 0.2.0')
	}

	if (args.files[0] === '-') {

		mapStandardInput(function (file) {
			console.log(file)
		})

	} else {

		args.files.forEach(function (file) {
			console.log(file)
		})

	}

}




module.exports = {
	main: main
}
