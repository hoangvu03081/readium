const mongoose = require("mongoose");

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DATABASE_NAME,
  MONGO_PORT,
} = process.env;

const getUrl = (db) =>
  `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${db}?authSource=admin`;

// connect to mongodb
mongoose
  .connect(getUrl(MONGO_DATABASE_NAME))
  .then(console.log("successfully connect to mongodb"))
  .catch((err) => console.log(err));

module.exports = { getUrl };
