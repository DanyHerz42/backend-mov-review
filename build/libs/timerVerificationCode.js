"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deleteVerificationCode;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

function deleteVerificationCode(_x) {
  return _deleteVerificationCode.apply(this, arguments);
}

function _deleteVerificationCode() {
  _deleteVerificationCode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(code) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                var borrar;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _models.VerificationCode.findOneAndDelete({
                          code: code
                        });

                      case 2:
                        borrar = _context.sent;
                        console.log("yaaaaaaa");

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              })), 300000);
            } catch (error) {
              console.log(error);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _deleteVerificationCode.apply(this, arguments);
}