"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

_mongoose["default"].connect(_config["default"].DB_SERVER, {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(function (db) {
  return console.log("Db is connected");
})["catch"](function (error) {
  return console.error(error);
});