"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _jwt = require("../middlewares/jwt.auth");

var _auth = require("../controllers/auth.controller");

var router = (0, _express.Router)();
router.post("/signup", _auth.signup);
router.post("/verificationTwice", _auth.verificationTwice);
router.post("/verifyCode", _auth.verifyCode);
router.post("/verifyIfUserExists", _auth.verifyIfUserExists);
router.post("/login", _auth.login);
router.post("/auth-admin", _jwt.isAdmin, _auth.authAdmin);
var _default = router;
exports["default"] = _default;