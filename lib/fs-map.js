#!/usr/bin/env node

const fs   = require('fs')
const path = require('path')











const fsMap = function (fn, dir, config) {
	/*
		Implemented recursively!
	*/

	const recur  = config.recur
	const unhide = config.unhide

	const isHidden = function (fpath) {
		/*
			does a basename begin with '.'?
			Returns false if --unhide is set.
		*/

		return unhide? false: path.basename(fpath).charAt(0) === '.'
	}

	fs.readdir(dir, function (err, contents) {

		if (err) {
			throw err
		}

		// do over each file in a folder.
		contents.forEach(function (fpath) {

			fpath        = path.resolve(dir, fpath)

			// get file metadata.
			fs.stat(fpath, function (err, stat) {

				if (err) {
					throw err
				}

				const fpathIsRecursive =
					stat  && stat.isDirectory() && recur && !isHidden(fpath)

				const isTargetFile =
					stat && !isHidden(fpath)

				if (fpathIsRecursive) {
					// this file is a folder; recur into it.

					fsMap(fn, fpath, config)

				} else if (isTargetFile) {
					// we are at a node; apply the function.

					fn(fpath)
				}

			})
		})
	})
}






module.exports = fsMap
