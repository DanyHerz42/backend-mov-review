"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _jwt = require("../middlewares/jwt.auth");

var _movies = require("../controllers/movies.controller");

var router = (0, _express.Router)();
router.post('/create-movie', [_jwt.verifyToken, _jwt.isAdminTwo], _movies.create);
router.get('/list-all-movies', [_jwt.verifyToken], _movies.listAll);
var _default = router;
exports["default"] = _default;