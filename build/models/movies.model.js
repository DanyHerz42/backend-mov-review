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
  protaginist: String,
  director: String,
  language: String,
  producedBy: String,
  roles: [{
    ref: "Review",
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
});
var Movie = (0, _mongoose.model)("Movie", movieSchema);
var _default = Movie;
exports["default"] = _default;