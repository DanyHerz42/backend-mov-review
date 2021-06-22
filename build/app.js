"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _initialSetup = require("./libs/initialSetup");

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _movies = _interopRequireDefault(require("./routes/movies.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

//importacion de rutas
var limiter = (0, _expressRateLimit["default"])({
  windowMs: 15 * 60 * 1000,
  max: 100
}); //configuracion de express

var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
app.set("pkg", _package["default"]);
app.set("port", process.env.PORT || 4000);
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])()); //ruta inicial de API

app.get("/", function (req, res) {
  res.json({
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    name: app.get('pkg').name,
    version: app.get('pkg').version
  });
}); //rutas

app.use("/sign", limiter, _auth["default"]);
app.use("/movies", _movies["default"]);
app.use("/users", _user["default"]);
var _default = app;
exports["default"] = _default;