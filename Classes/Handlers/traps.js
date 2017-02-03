
//traps
let get = require('./traps/get');
let set = require('./traps/set');
let has = require('./traps/has');
let deleteProperty = require('./traps/deleteProperty');
let defineProperty = require('./traps/defineProperty');

module.exports = { get, set, has, deleteProperty, defineProperty };