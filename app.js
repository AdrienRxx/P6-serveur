const { PORT } = require("./manager/env.js");
const express = require("express");
const app = express();
const path = require("path");
if (!PORT) throw new Error("PORT must be set in .env");
app.use(require("cors")({ origin: "http://localhost:4200" }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(require("helmet")());
app.use(require("morgan")("dev"));
app.use(express.json());
app.use(require("./middlewares/mongoReady.js"));
app.use("/api", require("./routes/api.js"));
app.listen(PORT, () => {
  console.log(`server is listening on http://locahost:${PORT}`);
});
require("./manager/mongodb.js");
