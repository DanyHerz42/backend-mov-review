"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var verificationCode = new _mongoose.Schema({
  code: Number,
  phone: Number
}, {
  versionKey: false
});
var VerificationCode = (0, _mongoose.model)("VerificationCode", verificationCode);
var _default = VerificationCode;
exports["default"] = _default;