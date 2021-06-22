"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateCorrectCode;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

function validateCorrectCode(_x, _x2) {
  return _validateCorrectCode.apply(this, arguments);
}

function _validateCorrectCode() {
  _validateCorrectCode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(phone, tCode) {
    var phoneParsed, codeParsed, existPhone;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            phoneParsed = parseInt(phone);
            codeParsed = parseInt(tCode);
            _context.prev = 2;
            _context.next = 5;
            return _models.VerificationCode.findOne({
              phone: phoneParsed
            });

          case 5:
            existPhone = _context.sent;

            if (existPhone) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", 1);

          case 10:
            if (!(existPhone.code === codeParsed)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", 2);

          case 14:
            return _context.abrupt("return", 3);

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 17]]);
  }));
  return _validateCorrectCode.apply(this, arguments);
}