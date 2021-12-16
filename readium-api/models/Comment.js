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

commentSchema.methods.toJSON = function () {
  const comment = this.toObject();
  comment.id = comment._id;
  delete comment._id;
  delete comment.__v;
  return comment;
};

module.exports = model("Comment", commentSchema);
