#!/usr/bin/env node

const is   = require('is')
const fs   = require('fs')
const path = require('path')





const redo = function (fn, num) {

	console.assert(is.function(fn))
	console.assert(is.number(num))

	var out = []

	for (var ith = 0; ith < num; ++ith) {
		out[ith] = fn()
	}

	return out

}

const randomLetters = function (num) {

	console.assert(is.number(num))

	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

	return redo(function () {
		return charset.charAt( Math.floor(Math.random() * charset.length) )
	}, num)
	.join('')

}





const parseArgs = function (args) {

	const size = args.size

	if (size !== size) {
		throw Error("size was a non-numeric value (" + arg.size + ").")
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
		size:    parseInt(args.size, 10),
		files:   args.files
	}

}





const mapStandardInput = function (callback) {

	console.assert(is.function(callback))

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



// TODO: UNIX only.

const isAbsolutePath = function (fpath) {
	return fpath.charAt[0] === '/'
}

const abspath = function (fpath) {
	return isAbsolutePath(fpath) ? fpath: path.resolve(__dirname, fpath)
}






const rename = function (fpath, renamer, shouldRecur, shouldNuke) {

	fs.lstat(fpath, function (err, stats) {

		if (err) {
			process.stderr.write(err.message + '\n')
			return;
		}

		if (fpath === '/' && !shouldNuke) {
			process.stderr.write('attempted to rename \ or its contents without --no-preserve-root. \n')
			process.exit(1)
		}


		/*

		fs.rename(fpath, renamer(fpath), function (err) {

			if (err) {
				process.stderr.write(err.message + '\n')
				return;
			}

			if (shouldRecur)

		})
		*/

	})

}




const main = function (args) {

	args = parseArgs(args)

	if (args.version) {
		console.log('gibbr 0.2.0')
	}

	const randomFileName = function (fpath) {

		const basename = randomLetters(args.size) + path.extname(fpath)
		return path.resolve(path.dirname(abspath(fpath)), basename)

	}

	if (args.files[0] === '-') {

		mapStandardInput(function (file) {
			rename(abspath(file), randomFileName, args.recur, args.nuke)
		})

	} else {

		args.files.forEach(function (file) {
			rename(abspath(file), randomFileName, args.recur, args.nuke)
		})

	}

}




module.exports = {
	main: main
}
