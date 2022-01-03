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

collectionSchema.methods.getCollection = function () {
  const collection = this.toObject();
  collection.id = collection._id;
  delete collection._id;
  delete collection.__v;
  return collection;
};

module.exports = model("Collection", collectionSchema);
