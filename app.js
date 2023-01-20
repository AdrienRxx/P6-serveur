const env = require("./manager/env.js");
const express = require("express");
console.log(env);
const app = express();
const port = 3000;

app.use(require("./middlewares/mongoReady.js"));
app.use(require("./middlewares/logger.js"));
app.use("/api", require("./routes/api.js"));
app.listen(port, () => {
  console.log(`server is listening on http://locahost:${port}`);
});

require("./manager/mongodb.js");
