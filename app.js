const { PORT } = require("./manager/env.js");
const express = require("express");
const app = express();
const path = require("path");
const saucesRoutes = require("./routes/sauces.js");
const userRoutes = require("./routes/auth.js");
if (!PORT) throw new Error("PORT must be set in .env");
app.use(require("./middlewares/mongoReady.js"));
app.use(require("./middlewares/auth.js"));
app.use("/api", require("./routes/api.js"));
app.listen(PORT, () => {
  console.log(`server is listening on http://locahost:${PORT}`);
});
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
require("./manager/mongodb.js");
