"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var roleSchema = new _mongoose.Schema({
  name: String
}, {
  versionKey: false
});
var Role = (0, _mongoose.model)("Role", roleSchema);
var _default = Role;
exports["default"] = _default;