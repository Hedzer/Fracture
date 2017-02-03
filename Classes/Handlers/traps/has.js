
//native
const fs = require('fs');
const fspath = require('path');

//objects & methods
const types = require('../types');
const error = require('../error');

//symbols
const $private = require('../../../Symbols/private');


function has(target, key, receiver) {
	//if it's a native function call, do that
	let native = Reflect.get(target, key, receiver);
	if (typeof key === 'symbol' || typeof native === 'function') {
		return native;
	}

	//otherwise pull from FS
	let path = fspath.join(target[$private].path, key);
	let stats = undefined;

	try {
		stats = fs.lstatSync(path);
	} catch(e) {
		return false;
	}
	
	return (stats.isDirectory() || stats.isFile());
};
module.exports = has;