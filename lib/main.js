#!/usr/bin/env node

const doc = [
	"Usage:",
	"    gibbr <path> [--len=<num>] [-d | --dirs=<bool>] [-r | --recursive=<bool>] [-h | --hidden=<bool>]",
	"    gibbr (-h | --help | --version)",
	"",
	"Description:",
	"",
	"",
	"",
	"Options:",
	"    --len=<num>        [default: 12] The length of the new filenames to be written.",

	"    --dirs=<bool>      [default: False] Should directories be renamed too?",

	"    --recur=<bool> [default: False] Should files in the path be recursively renamed?",

	"    --version          Show the current version number",
	"",
	"",
	""
].
join('\n')

const docopt = require("docopt").docopt
const fsMap  = require("fs-map")

const args   = docopt(args)





const main = function (args) {
	/*
		the main function takes command-line arguments.
	*/

	// -- test that numeric arguments are non-NaN and positive.
	;["len"].map(function (prop) {

		const num = parseInt(args[prop], 10)

		if (num !== num) {
			log(TypeError("the argument matching '" + prop + "' must be coercible to integer.").toString())
			process.exit(1)
		}
		if (!(num > 0)) {
			log(RangeError("the argument matching '" + prop + "' must be a positive number.").toString())
			process.exit(1)
		}

		if (Math.round(num) !== num) {
			log(RangeError("the argument matching '" + prop + "' must be a round number.").toString())
			process.exit(1)
		}

	})

	// -- ensure that length is larger than one
	if (args.len <= 1) {
		log(RangeError("the argument matching 'len' must larger than one.".red).toString())
		process.exit(1)
	}




	fsMap(renameFile, path)



}





main({
	path    : args["<path>"]
	len     : args["len"],
	recur   : args[""]
})