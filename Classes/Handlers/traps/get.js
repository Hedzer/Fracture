
//native
const fs = require('fs');
const fspath = require('path');
const MessagePack = require('msgpack-lite');

//objects & methods
const identify = require('../identify');
const error = require('../error');

//symbols
const $private = require('../../../Symbols/private');


function get(target, key, receiver) {

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
		return stats;
	}
	
	//if it's a folder, read as a new object
	if (stats.isDirectory()) {

		let isArray = undefined;

		try { isArray = fs.lstatSync(fspath.join(path, '.[...]')); } catch(e) {}
		if (isArray) {
			return new (require('../../ArrayFolder'))(path);
		}

		return new (require('../../ObjectFolder'))(path);
	}
	//if it's a file, read, parse, return
	if (stats.isFile()) {
		try {
			let results = fs.readFileSync(path);
			try {
				let stored = MessagePack.decode(results);
				let handle = identify.byTypeId(stored.type);
				value = handle.parse(stored.value);
				return value;
			} catch(e) {
				error({
					title: 'Fracture Parse Error',
					error: e,
					path: path,
					target: target
				});
			}
		} catch(e) {
			error({
				title: 'Fracture File I/O Error',
				error: e,
				path: path,
				target: target
			});
		}
	}
};
module.exports = get;