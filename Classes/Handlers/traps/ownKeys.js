
//native
const fs = require('fs');
const fspath = require('path');

//symbols
const $private = require('../../../Symbols/private');


function ownKeys(target) {
	let path = target[$private].path;
	let keys = fs.readdirSync(path);
	return keys;
};
module.exports = ownKeys;