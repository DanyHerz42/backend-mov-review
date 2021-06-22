"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Movie", {
  enumerable: true,
  get: function get() {
    return _movies["default"];
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
Object.defineProperty(exports, "Role", {
  enumerable: true,
  get: function get() {
    return _roles["default"];
  }
});
Object.defineProperty(exports, "VerificationCode", {
  enumerable: true,
  get: function get() {
    return _verificaticonCode["default"];
  }
});

var _movies = _interopRequireDefault(require("./movies.model"));

var _user = _interopRequireDefault(require("./user.model"));

var _roles = _interopRequireDefault(require("./roles.model"));

var _verificaticonCode = _interopRequireDefault(require("./verificaticonCode.model"));