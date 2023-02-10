const express = require("express");

const routes = express();

routes.use("/auth", require("./auth.js"));
routes.use("/sauces", require("./sauces.js"));

module.exports = routes;
