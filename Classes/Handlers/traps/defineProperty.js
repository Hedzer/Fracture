
let set = require('./set');

function defineProperty(target, key, descriptor, receiver) {
	if ('value' in descriptor) {
		set(target, key, descriptor.value);
	}
	return Reflect.defineProperty(target, key, descriptor);
};
module.exports = defineProperty;