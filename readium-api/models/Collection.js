const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  posts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("Collection", collectionSchema);
