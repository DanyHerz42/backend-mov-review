"use strict";

var _app = _interopRequireDefault(require("./app"));

require("./database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_app["default"].listen(_app["default"].get("port"), function () {
  console.log("API connect");
  console.log("Server listening on http://localhost:".concat(_app["default"].get("port"), "/"));
});