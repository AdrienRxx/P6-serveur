const express = require("express");

const routes = express();

routes.use("/auth", require("./auth.js"));

module.exports = routes;
