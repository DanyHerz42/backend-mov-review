"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models/");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, email, password, repeatPassword, name, lastname, roles, validarUsername, validarEmail, newUser, foundRoles, role, savedUser, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, repeatPassword = _req$body.repeatPassword, name = _req$body.name, lastname = _req$body.lastname, roles = _req$body.roles; //validar si usuario ya existe

            _context.next = 3;
            return _models.User.findOne({
              username: username
            });

          case 3:
            validarUsername = _context.sent;
            _context.next = 6;
            return _models.User.findOne({
              email: email
            });

          case 6:
            validarEmail = _context.sent;

            if (validarUsername || validarEmail) {
              res.status(500).json({
                message: "ese usuario ya existe"
              });
            } //validar contraseñas iguales


            if (!(password === repeatPassword)) {
              res.status(500).json({
                message: "Las contraseñas no coinciden"
              });
            } //crear usuario


            _context.t0 = _models.User;
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 14;
            return _models.User.encryptPassword(password);

          case 14:
            _context.t3 = _context.sent;
            _context.t4 = name;
            _context.t5 = lastname;
            _context.t6 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3,
              name: _context.t4,
              lastname: _context.t5
            };
            newUser = new _context.t0(_context.t6);

            if (!roles) {
              _context.next = 26;
              break;
            }

            _context.next = 22;
            return _models.Role.find({
              name: {
                $in: roles
              }
            });

          case 22:
            foundRoles = _context.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 30;
            break;

          case 26:
            _context.next = 28;
            return _models.Role.findOne({
              name: "user"
            });

          case 28:
            role = _context.sent;
            newUser.roles = [role._id];

          case 30:
            _context.next = 32;
            return newUser.save();

          case 32:
            savedUser = _context.sent;
            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            res.status(200).json({
              token: token
            });

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;