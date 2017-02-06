//native
const fs = require('fs');
const fspath = require('path');

//symbols
const $private = require('../../../Symbols/private');

function getOwnPropertyDescriptor(target, key, descriptor, receiver) {

	//otherwise pull from FS
	let path = fspath.join(target[$private].path, key);

	try {
		stats = fs.lstatSync(path);
		return {
			enumerable: true,
			configurable: true
		};
	} catch(e) {
		return Reflect.getOwnPropertyDescriptor(target, key, descriptor);
	}
};
module.exports = getOwnPropertyDescriptor;