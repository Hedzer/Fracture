
//native
const fs = require('fs');
const fspath = require('path');
const rmdir = require('rimraf');
const MessagePack = require('msgpack-lite');

//objects & methods
const identify = require('../identify');
const error = require('../error');

//symbols
const $private = require('../../../Symbols/private');

function set(target, key, value, receiver) {
	let path = fspath.join(target[$private].path, key);
	let stats = undefined;
	let isArray = Array.isArray(value);

	try {
		stats = fs.lstatSync(path);
	} catch(e) {}

	//if it's an object
	let type = identify.byValue(value);
	if (typeof value === 'object' && type.id === 'generic') {
		//if it's an atomic value, aka a file, remove it
		if (stats && stats.isFile()) {
			fs.unlinkSync(path);
			stats = undefined;
		}
		if (!stats) {
			try { fs.mkdirSync(path); } catch(e) {
				error({
					title: 'Fracture Folder I/O Error',
					error: e,
					path: path,
					target: target
				});
				return false;
			}
		}
		//check for what different
		let difference = fs.readdirSync(path).filter((node) => { return !value[node]; });

		//delete the differences
		difference.forEach((node) => {
			if (isArray && node === '.[...]') { return; }
			let nodePath = fspath.join(path, node);
			try {
				let nodeStat = fs.lstatSync(nodePath);
				if (nodeStat.isDirectory()) {
					rmdir.sync(nodePath);
				}
				if (nodeStat.isFile()) {
					fs.unlinkSync(nodePath);
				}
			} catch (e) {}
		});
		
		let arrayIndicatorPath = fspath.join(path, '.[...]');
		if (isArray) {
			try { fs.mkdirSync(arrayIndicatorPath); } catch(e) {}
		}
		
		//save the new values
		let proxy = new (require('../../ObjectFolder'))(path);
		Object.keys(value).forEach((key) => {
			proxy[key] = value[key];
		});
		return true;
	}

	if (stats && stats.isDirectory()) {
		rmdir.sync(path);
	}

	//							  { t = type,   v = value 				 }
	let contents = MessagePack.encode({ t: type.id, v: type.stringify(value) });
	fs.writeFileSync(path, contents);
	return true;
}

module.exports = set;