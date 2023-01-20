const { PORT } = require("./manager/env.js");
const express = require("express");
const app = express();
if (!PORT) throw new Error("PORT must be set in .env");
app.use(require("./middlewares/mongoReady.js"));
app.use(require("./middlewares/logger.js"));
app.use("/api", require("./routes/api.js"));
app.listen(PORT, () => {
  console.log(`server is listening on http://locahost:${PORT}`);
});

require("./manager/mongodb.js");
