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
Object.defineProperty(exports, "Review", {
  enumerable: true,
  get: function get() {
    return _review["default"];
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

var _movies = _interopRequireDefault(require("./movies.model"));

var _review = _interopRequireDefault(require("./review.model"));

var _user = _interopRequireDefault(require("./user.model"));

var _roles = _interopRequireDefault(require("./roles.model"));