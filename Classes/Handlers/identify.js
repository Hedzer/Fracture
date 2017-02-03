let types = require('./types');
let crc16 = require('../../External/crc16');
let byID = {};

Object.keys(types).forEach((major) => {
	let subtypes = types[major];
	Object.keys(subtypes).forEach((minor) => {
		let id = crc16(`${major}:${minor}`);
		let handler = subtypes[minor];
		handler.major = major;
		handler.minor = minor;
		handler.id = id;
		byID[id] = handler;
	});
});

module.exports.byValue = function byValue(value) {
	let major = types[typeof value];
	if (!major) {
		return types.generic;
	}
	for (let minor in major) {
		let handler = major[minor];
		if (handler.identify(value)) {
			return handler;
		}
	}
	return types.generic;
};

module.exports.byTypeId = function byTypeID(id) {
	let handler = byID[id];
	return (handler || types.generic);
}