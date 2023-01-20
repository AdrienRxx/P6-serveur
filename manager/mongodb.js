const { MongoClient, ServerApiVersion } = require("mongodb");
const { MONGODB_URI } = require("./env.js");
const mongoose = require("mongoose");
if (!MONGODB_URI) throw new Error("MONGODB_URI must be set in .env.local");
module.exports = mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
