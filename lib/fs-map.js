#!/usr/bin/env node

const fs   = require('fs')
const path = require('path')






const notHidden = function (fpath) {
	return path.basename(fpath).charAt(0) !== '.'
}





const fsMap = function (fn, dir, config) {
	/*
		Implemented recursively!
	*/

	const recur     = config.recur
	const seeHidden = config.seeHidden

	fs.readdir(dir, function (err, contents) {

		if (err) {
			throw err
		}

		// do over each file in a folder.
		contents.forEach(function (fpath) {

			fpath        = path.resolve(dir, fpath)
			var isHidden = notHidden(fpath)

			// get file metadata.
			fs.stat(fpath, function (err, stat) {

				if (err) {
					throw err
				}

				const isTargetDirectory =
					stat  && stat.isDirectory() &&
					recur && notHidden(fpath)

				const isTargetFile =
					stat && notHidden(fpath)

				if (isTargetDirectory) {
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
