"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var verificationCode = function verificationCode() {
  return Math.round(Math.random() * 999999);
};

var _default = verificationCode;
exports["default"] = _default;