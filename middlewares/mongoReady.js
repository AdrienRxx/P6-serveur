function mongoReady(req, res, next) {
  const mongoDb = require("../manager/mongodb.js");
  mongoDb.then(() => next());
}
module.exports = mongoReady;
