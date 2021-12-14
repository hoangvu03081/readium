const MongoStore = require("connect-mongo");
const sessions = require("express-session");

const { getUrl } = require("../utils/db");

const sessionsOptions = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  },
  resave: false,
  store: MongoStore.create({
    mongoUrl: getUrl("session"),
  }),
};

const sessionsParser = sessions(sessionsOptions);

module.exports = {
  sessionsOptions,
  sessionsParser,
};
