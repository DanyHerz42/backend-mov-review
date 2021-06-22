"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdminTwo = exports.isAdmin = exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _config = _interopRequireDefault(require("../config"));

var _roles = _interopRequireDefault(require("../models/roles.model"));

var verifyToken = function verifyToken(req, res, next) {
  console.log(req.headers['x-access-token']);

  try {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({
      message: "No token provided"
    });

    var decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);

    req.userId = decoded.id;

    var user = _user["default"].findOne(req.userId, {
      password: 0
    });

    if (!user) return res.status(404).json({
      message: "No user found"
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unautorized"
    });
  }
};

exports.verifyToken = verifyToken;

var isAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var user, roles, i;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne({
              email: req.body.email
            });

          case 2:
            user = _context.sent;

            if (!user) {
              res.status(203).json({
                message: "Usuario incorrecto"
              });
            }

            _context.next = 6;
            return _roles["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 6:
            roles = _context.sent;
            i = 0;

          case 8:
            if (!(i < roles.length)) {
              _context.next = 15;
              break;
            }

            if (!(roles[i].name === "admin")) {
              _context.next = 12;
              break;
            }

            next();
            return _context.abrupt("return");

          case 12:
            i++;
            _context.next = 8;
            break;

          case 15:
            res.status(403).json({
              message: "Require admin role"
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;

var isAdminTwo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user, roles, i;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              _id: req.userId
            });

          case 2:
            user = _context2.sent;

            if (!user) {
              res.status(203).json({
                message: "Usuario incorrecto"
              });
            }

            _context2.next = 6;
            return _roles["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 6:
            roles = _context2.sent;
            i = 0;

          case 8:
            if (!(i < roles.length)) {
              _context2.next = 15;
              break;
            }

            if (!(roles[i].name === "admin")) {
              _context2.next = 12;
              break;
            }

            next();
            return _context2.abrupt("return");

          case 12:
            i++;
            _context2.next = 8;
            break;

          case 15:
            res.status(403).json({
              message: "Require admin role"
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isAdminTwo(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isAdminTwo = isAdminTwo;