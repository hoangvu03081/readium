const mongoose = require("mongoose");

const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

const collectionSchema = new Schema({
  name: { type: String, required: true, default: "Default Collection" },
  posts: [{ type: ObjectId, ref: "Post", required: true }],
});

module.exports = model("Collection", collectionSchema);
