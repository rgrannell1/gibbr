#!/usr/bin/env node

const fs   = require('fs')
const path = require('path')





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
		contents.forEach(function (file) {

			file         = path.resolve(dir, file)
			var isHidden = file.charAt(0) === 	'.'

			// get file metadata.
			fs.stat(file, function (err, stat) {

				if (err) {
					throw err
				}

				if (stat && stat.isDirectory() && recur) {
					// this file is a folder; recur into it.

					fsMap(fn, file)

				} else {
					// we are at a node; apply the function.
					fn(file)
				}

			})
		})
	})
}






module.exports = fsMap
