const mongoose = require("mongoose");

const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  user: { type: ObjectId, ref: "User", required: true },
  post: { type: ObjectId, ref: "Post", required: true },
});

module.exports = model("Comment", commentSchema);
