'use strict';

//native
const fs = require('fs');
const fspath = require('path');

//objects & methods
const traps = require('./Handlers/traps');

//symbols
const $private = require('../Symbols/private');

class ObjectFolder {
	constructor(path) {
		let stats = fs.lstatSync(path);
		let proxy = Proxy.revocable(this, traps);
		this[$private] = {
			path: fspath.resolve(path),
			stats: stats, 
			Proxy: proxy
		};
		return proxy.proxy;
	}
}

module.exports = ObjectFolder;