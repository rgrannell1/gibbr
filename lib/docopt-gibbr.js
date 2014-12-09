#!/usr/bin/env node

const doc = [
	"NAME:",

	"    gibbr v0.2.0 - A utility for scrambling filenames.",

	"USAGE:",

	"    gibbr [--no-preserve-root|--preserve-root] [-r|-R|--recursive] [--len=<num>] [-v|--verbose] [<file>...]",
	"    gibbr (-h | --help | --version)",
	"",
	"DESCRIPTION:",
	"",
	"    gibbr is a utility for scrambling filenames. It accepts file and",
	"    folder paths from standard input and the command line, and",
	"    replaces the file name with a random string. ",
	"",
	"ARGUMENTS:",
	"",
	"    <file>...               the files to rename. Use \"-\" to read from standard input.",

	"OPTIONS:",
	"",
	"    --no-preserve-root       do not treat '/' specially.",

	"    --preserve-root          do not rename or modify '/' or its contents. Default behaviour.",

	"    -r, -R, --recursive      recur into any directories given as inputs.",

	"    --len=<num>              [default: 12] the length of each new filename.",

	"    -v, --verbose            explain what is being done.",

	"    -h, --help, --version    output the version number and help.",
	"",
	"AUTHOR:",
	"    Written by Ryan Grannell."

]
.join('\n')




const main   = require('./gibbr.js').main
const docopt = require("docopt").docopt
const is     = require('is')

const args   = docopt(doc)




main({
	len:     args['--len'],
	files:   args['<file>'],

	nuke:    !!args['-no-preserve-root'],
	recur:   args['-r'] || args['-R'] || args['--recursive'],
	verbose: args['-v'] || args['--verbose']
})
