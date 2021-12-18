const {
  swaggerDoc,
  swaggerUi,
  sessionsParser,
  corsOptions,
} = require("./config");

const express = require("express");
const app = express();

const cors = require("cors");
const passport = require("passport");

require("./config/db");
require("./config/passport")(passport);

app.use(express.json({ limit: "50mb" }));
app.use(sessionsParser);
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

if (process.env.NODE_ENV === "development") {
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}

module.exports = app;
