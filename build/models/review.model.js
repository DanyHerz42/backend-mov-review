"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var reviewSchema = new _mongoose.Schema({
  review: String,
  points: Number,
  user: {
    ref: "User",
    type: _mongoose.Schema.Types.ObjectId
  }
}, {
  timestamps: true,
  versionKey: false
});
var Review = (0, _mongoose.model)("Review", reviewSchema);
var _default = Review;
exports["default"] = _default;