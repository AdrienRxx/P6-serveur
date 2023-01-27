const express = require("express");
const { login, signup } = require("../controllers/auth.js");

const router = express();

router.post("/login", login);
router.post("/signup", signup);
module.exports = router;
