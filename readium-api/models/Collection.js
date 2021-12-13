const mongoose = require("mongoose");

const {
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

const collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Default Collection",
  },
  posts: {
    default: [],
    type: [
      {
        type: ObjectId,
        required: true,
        ref: "Post",
      },
    ],
  },
});

module.exports = collectionSchema;
