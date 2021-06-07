"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _helmet = _interopRequireDefault(require("helmet"));

var _initialSetup = require("./libs/initialSetup");

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//importacion de rutas
//configuracion de express
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
app.set("pkg", _package["default"]);
app.set("port", process.env.PORT || 3000);
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use((0, _helmet["default"])()); //ruta inicial de API

app.get("/", function (req, res) {
  res.json({
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    name: app.get('pkg').name,
    version: app.get('pkg').version
  });
}); //rutas

app.use("/", _auth["default"]);
var _default = app;
exports["default"] = _default;