const {
  elasticsearch,
  rabbitmq,
  swaggerDoc,
  swaggerUi,
  sessionsOptions,
  corsOptions,
} = require("./config");

const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const sessions = require("express-session");

const {
  messageCode: { NO_AUTH_TOKEN, REQUIRE_ACTIVATE_ACCOUNT },
} = require("./utils/auth");

require("./config/db");
require("./config/passport")(passport);

app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(sessions(sessionsOptions));

app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session()); // create a persistent login session

app.use(require("./routes"));

if (process.env.NODE_ENV === "development")
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req, res) => {
  return res.status(404).send({ message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  if (err.message === REQUIRE_ACTIVATE_ACCOUNT) {
    return res.status(401).send({
      message: "Please activate your account before doing this action!",
    });
  } else if (err.message === NO_AUTH_TOKEN) {
    return res.status(401).send({ message: "Unauthenticated" });
  }
  return res.status(500).send({ message: "Some errors" });
});

module.exports = app;
