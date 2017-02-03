'use strict';

const ObjectFolder = require('./Classes/ObjectFolder');
const mkdirp = require('mkdirp');

class Fracture {
	static open(path, options) {
		/* options expects: 
			create: boolean, creates the path given, regardless of how deep it is
		*/
		options = (options || { create: true });
		if (options.create) {
			mkdirp.sync(path);
		}
		return new ObjectFolder(path);
	}
}

module.exports = Fracture;