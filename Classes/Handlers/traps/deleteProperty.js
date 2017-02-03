
//native
const fs = require('fs');
const fspath = require('path');
const rmdir = require('rimraf');

//objects & methods
const types = require('../types');
const error = require('../error');

//symbols
const $private = require('../../../Symbols/private');


function deleteProperty(target, key, receiver) {
	//otherwise pull from FS
	let path = fspath.join(target[$private].path, key);
	let stats = undefined;

	try {
		stats = fs.lstatSync(path);
	} catch(e) {
		return false;
	}
	if (stats) {
		try {
			if (stats.isDirectory()) {
				rmdir.sync(path);
			}
			if (stats.isFile()) {
				fs.unlinkSync(path);
			}
		} catch(e) {
			return false;
		}
	}

	return true;
};
module.exports = deleteProperty;