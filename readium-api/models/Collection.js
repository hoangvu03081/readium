const mongoose = require("mongoose");

const {
  model,
  Schema,
  Schema: { ObjectId },
} = mongoose;

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: ObjectId,
      required: true,
      ref: "Post",
    },
  ],
});

module.exports = {
  collectionSchema,
  Collection: model("Collection", collectionSchema),
};
