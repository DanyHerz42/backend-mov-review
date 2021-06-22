"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var movieSchema = new _mongoose.Schema({
  name: String,
  sinopsis: String,
  duration: String,
  producedBy: String,
  imageURL: String
}, {
  timestamps: true,
  versionKey: false
});
var Movie = (0, _mongoose.model)("Movie", movieSchema);
var _default = Movie;
exports["default"] = _default;