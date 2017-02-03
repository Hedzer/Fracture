let shim = require('console-shim2');

function error(e) {
	/* e expects:
		{
			title: string, the title of the error,
			error: error, the error object pertaining to the error,
			path: string, the path of the file system node,
			target: object/array, the actual target of the proxy
		}
	*/
	console.groupCollapsed(e.title);
	console.log('Path: ', e.path);
	console.log('Error: ', e.error);
	console.log('Target: ', e.target);
	console.groupEnd();
}

module.exports = error;