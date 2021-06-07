"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("./database");

_app["default"].listen(_app["default"].get("port"), function () {
  console.log("API connect");
  console.log("Server listening on http://localhost:".concat(_app["default"].get("port"), "/"));
});