"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.listAll = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _movies = _interopRequireDefault(require("../models/movies.model"));

var listAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var movies;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _movies["default"].find();

          case 3:
            movies = _context.sent;
            res.status(200).json({
              movies: movies
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function listAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.listAll = listAll;

var create = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, name, sinopsis, producedBy, imageURL, addMovie, saveMovie;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, sinopsis = _req$body.sinopsis, producedBy = _req$body.producedBy, imageURL = _req$body.imageURL;
            addMovie = new _movies["default"]({
              name: name,
              sinopsis: sinopsis,
              producedBy: producedBy,
              imageURL: imageURL
            });
            _context2.next = 4;
            return addMovie.save();

          case 4:
            saveMovie = _context2.sent;
            console.log(saveMovie);
            res.status(200).json({
              saveMovie: saveMovie
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function create(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.create = create;