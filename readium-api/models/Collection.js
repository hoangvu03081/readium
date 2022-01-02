const mongoose = require("mongoose");

const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

const collectionSchema = new Schema({
  user: { type: ObjectId, required: true },
  name: { type: String, default: "Default Collection" },
  posts: [{ type: ObjectId, ref: "Post", required: true }],
});

module.exports = model("Collection", collectionSchema);
