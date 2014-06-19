#!/usr/bin/env node

/*
    Gibbr.js

    A node.js command-line application for renaming filenames with random strings.




*/

const doc = [
	"Usage:",
	"    gibbr <path> [--len=<num>] [-r | --recur] [-u | --unhide]",
	"    gibbr (-h | --help | --version)",
	"",
	"Description:",
	"   gibbr renames.",
	"",
	"Options:",
	"    --len=<num>        [default: 12] The length of the new filenames to be written.",
	"    --recur            ",
	"    --unhide           Should files in the path be recursively renamed?",
	"    --version          Show the current version number",
	"",
	"",
	""
].
join('\n')

const docopt     = require("docopt").docopt
const renameFile = require("./rename-file")
const fsMap      = require("./fs-map")

const args       = docopt(doc)
const log        = console.log




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

	args.len = parseInt(args.len, 10)

	// -- ensure that length is larger than one
	if (args.len <= 1) {
		log(RangeError("the argument matching 'len' must larger than one.".red).toString())
		process.exit(1)
	}

	// validate the flag arguments


	fsMap(function (fpath) {
		renameFile(fpath, args.len)
	}, args.path, {
		recur  : args.recur,
		unhide : args.unhide
	})

}





main({
	path   : args["<path>"],
	len    : args["--len"],
	recur  : args["--recur"]  || args["-r"],
	unhide : args["--unhide"] || args["-u"]
})
