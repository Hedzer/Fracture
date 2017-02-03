module.exports = {
	object: {
		date: {
			identify: (value) => {
				return (value instanceof Date);
			},
			parse: (value) => {
				return new Date(value);
			},
			stringify: (value) => {
				return value.valueOf();
			}
		},
		null: {
			identify: (value) => {
				return (value === null);
			},
			parse: (value) => {
				return value;
			},
			stringify: (value) => {
				return value;
			}
		}
	},
	number: {
		number: {
			identify: (value) => {
				return (typeof value === 'number');
			},
			parse: (value) => {
				return value;
			},
			stringify: (value) => {
				return value;
			}
		}
	},
	string: {
		string: {
			identify: (value) => {
				return (typeof value === 'string');
			},
			parse: (value) => {
				return value;
			},
			stringify: (value) => {
				return value;
			}
		}
	},
	boolean: {
		boolean: {
			identify: (value) => {
				return (typeof value === 'boolean');
			},
			parse: (value) => {
				return value;
			},
			stringify: (value) => {
				return value;
			}
		}
	},
	function: {
		function: {
			identify: (value) => {
				return (typeof value === 'function');
			},
			parse: (value) => {
				return eval(`(${value})`);
			},
			stringify: (value) => {
				return value+"";
			}
		}
	},
	undefined: {
		undefined: {
			identify: (value) => {
				return (value === undefined);
			},
			parse: (value) => {
				return value;
			},
			stringify: (value) => {
				return value;
			}
		}
	},
	generic: {
		id: 'generic',
		identify: (value) => {
			return true;
		},
		parse: (value) => {
			return value;
		},
		stringify: (value) => {
			return value;
		}
	}
};