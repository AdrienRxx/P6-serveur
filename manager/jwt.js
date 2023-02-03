const jwt = require("jsonwebtoken");
const { JWT_TOKEN, JWT_EXPIRE } = require("./env.js");

if (!JWT_TOKEN) throw new Error("JWT_TOKEN must be set in .env.local");
if (!JWT_EXPIRE) throw new Error("JWT_EXPIRE must be set in .env.local");

function verify(token) {
  return jwt.verify(token, JWT_TOKEN);
}
function sign(data) {
  return jwt.sign(data, JWT_TOKEN, { expiresIn: JWT_EXPIRE });
}

module.exports = { verify, sign };
