const { GridFSBucket } = require("mongodb");
const mongoose = require("mongoose");
const { getUrl } = require("../utils");

let db = null;
const connect = () =>
  mongoose
    .connect(getUrl())
    .then(() => {
      db = mongoose.connection.getClient();
      db = db.db(process.env.MONGO_DATABASE_NAME);
    })
    .catch(console.log);

const getDb = () => db;

let bucket,
  count = 0;
const init = async () => {
  try {
    bucket = new GridFSBucket(getDb());
  } catch (err) {
    if (count > 10) {
      throw new Error("Something went wrong with GridFSBucket");
    }
    ++count;
    setTimeout(init, 1000);
  }
};
init();

const getBucket = () => bucket;

module.exports = { getDb, connect, getBucket };
