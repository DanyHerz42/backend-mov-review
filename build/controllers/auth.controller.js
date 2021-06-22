"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authAdmin = exports.login = exports.verifyIfUserExists = exports.verifyCode = exports.verificationTwice = exports.signup = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models/");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _generateVerificationCode = _interopRequireDefault(require("../libs/generateVerificationCode"));

var _timerVerificationCode = _interopRequireDefault(require("../libs/timerVerificationCode"));

var _validateCorrectCode = _interopRequireDefault(require("../libs/validateCorrectCode"));

var client = require('twilio')(_config["default"].ACCOUNT_SID, _config["default"].AUTH_TOKEN);

var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body$values, username, email, password, repeatPassword, roles, phone, twoSteps, validarEmail, newUser, foundRoles, role, savedUser, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body$values = req.body.values, username = _req$body$values.username, email = _req$body$values.email, password = _req$body$values.password, repeatPassword = _req$body$values.repeatPassword, roles = _req$body$values.roles, phone = _req$body$values.phone, twoSteps = _req$body$values.twoSteps;
            console.log(req.body.values); //validar si usuario ya existe

            _context.next = 4;
            return _models.User.findOne({
              email: email
            });

          case 4:
            validarEmail = _context.sent;

            if (!validarEmail) {
              _context.next = 9;
              break;
            }

            res.status(409).json({
              message: "ese usuario ya existe"
            });
            _context.next = 39;
            break;

          case 9:
            if (password === repeatPassword) {
              _context.next = 13;
              break;
            }

            res.status(500).json({
              message: "Las contraseñas no coinciden"
            });
            _context.next = 39;
            break;

          case 13:
            _context.t0 = _models.User;
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 18;
            return _models.User.encryptPassword(password);

          case 18:
            _context.t3 = _context.sent;
            _context.t4 = phone;
            _context.t5 = twoSteps;
            _context.t6 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3,
              phone: _context.t4,
              twoSteps: _context.t5
            };
            newUser = new _context.t0(_context.t6);

            if (!roles) {
              _context.next = 30;
              break;
            }

            _context.next = 26;
            return _models.Role.find({
              name: {
                $in: roles
              }
            });

          case 26:
            foundRoles = _context.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context.next = 34;
            break;

          case 30:
            _context.next = 32;
            return _models.Role.findOne({
              name: "user"
            });

          case 32:
            role = _context.sent;
            newUser.roles = [role._id];

          case 34:
            _context.next = 36;
            return newUser.save();

          case 36:
            savedUser = _context.sent;
            token = _jsonwebtoken["default"].sign({
              id: savedUser._id
            }, _config["default"].SECRET);
            res.status(200).json({
              token: token
            });

          case 39:
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

var verificationTwice = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var newVerification, createNewVerification, messInfo;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            newVerification = new _models.VerificationCode({
              code: (0, _generateVerificationCode["default"])(),
              phone: req.body.phone
            });
            _context2.next = 4;
            return newVerification.save();

          case 4:
            createNewVerification = _context2.sent;
            _context2.next = 7;
            return client.messages.create({
              to: "+".concat(req.body.phone),
              from: '+16105690732',
              body: "MovReview - Your verification code is ".concat(createNewVerification.code)
            });

          case 7:
            messInfo = _context2.sent;
            console.log(messInfo.sid);
            (0, _timerVerificationCode["default"])(newVerification.code);
            res.status(200).json({
              code: createNewVerification.code
            });
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function verificationTwice(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verificationTwice = verificationTwice;

var verifyCode = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _validateCorrectCode["default"])(req.body.phone, req.body.code);

          case 2:
            respuesta = _context3.sent;
            res.status(200).json({
              message: respuesta
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function verifyCode(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.verifyCode = verifyCode;

var verifyIfUserExists = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var email, validarEmail;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(req.body);
            email = req.body.email;
            _context4.next = 4;
            return _models.User.findOne({
              email: email
            });

          case 4:
            validarEmail = _context4.sent;

            if (validarEmail) {
              res.status(203).json({
                message: "Ese usuario ya existe"
              });
            } else {
              res.status(200).json({
                message: "Usuario valido"
              });
            }

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function verifyIfUserExists(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.verifyIfUserExists = verifyIfUserExists;

var login = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body, email, password, userFind, matchPassword, token;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context5.next = 3;
            return _models.User.findOne({
              email: email
            });

          case 3:
            userFind = _context5.sent;

            if (!userFind) {
              _context5.next = 11;
              break;
            }

            _context5.next = 7;
            return _models.User.comparePassword(password, userFind.password);

          case 7:
            matchPassword = _context5.sent;

            if (matchPassword) {
              token = _jsonwebtoken["default"].sign({
                id: userFind._id
              }, _config["default"].SECRET);
              res.status(200).json({
                token: token,
                user: userFind
              });
            } else {
              res.status(206).json({
                message: "Contraseña Incorrecta"
              });
            }

            _context5.next = 12;
            break;

          case 11:
            res.status(203).json({
              message: "Usuario inexistente"
            });

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function login(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.login = login;

var authAdmin = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body2, email, password, userFind, matchPassword, token;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context6.next = 3;
            return _models.User.findOne({
              email: email
            });

          case 3:
            userFind = _context6.sent;

            if (!userFind) {
              _context6.next = 11;
              break;
            }

            _context6.next = 7;
            return _models.User.comparePassword(password, userFind.password);

          case 7:
            matchPassword = _context6.sent;

            if (matchPassword) {
              token = _jsonwebtoken["default"].sign({
                id: userFind._id
              }, _config["default"].SECRET);
              res.status(200).json({
                token: token,
                user: userFind
              });
            } else {
              res.status(206).json({
                message: "Contraseña Incorrecta"
              });
            }

            _context6.next = 12;
            break;

          case 11:
            res.status(203).json({
              message: "Usuario inexistente"
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function authAdmin(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.authAdmin = authAdmin;