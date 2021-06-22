"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _jwt = require("../middlewares/jwt.auth");

var router = (0, _express.Router)();
router.get('/get-user-data', _jwt.verifyToken, _user.getUserInfo);
var _default = router;
exports["default"] = _default;