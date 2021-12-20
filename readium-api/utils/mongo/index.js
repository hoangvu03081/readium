const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DATABASE_NAME,
  MONGO_PORT,
} = process.env;

const getUrl = (db = MONGO_DATABASE_NAME) =>
  process.env.NODE_ENV === "test"
    ? `mongodb://localhost:27017/${db || "test"}`
    : `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${db}?authSource=admin`;

module.exports = { getUrl };
