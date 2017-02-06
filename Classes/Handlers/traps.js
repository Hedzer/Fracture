
//traps
let get = require('./traps/get');
let set = require('./traps/set');
let has = require('./traps/has');
let ownKeys = require('./traps/ownKeys');
let deleteProperty = require('./traps/deleteProperty');
let defineProperty = require('./traps/defineProperty');
let getOwnPropertyDescriptor = require('./traps/getOwnPropertyDescriptor');

module.exports = { get, set, has, ownKeys, deleteProperty, defineProperty, getOwnPropertyDescriptor };