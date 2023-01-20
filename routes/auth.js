const express = require("express");
const { login, signup } = require("../controllers/auth.js");

const routes = express();

routes.post("/login", login);
routes.post("/signup", signup);
module.exports = routes;
