const mongoose = require("mongoose");

const {
  model,
  Schema,
  Schema: { ObjectId },
} = mongoose;

const postSchema = new Schema({
  // required
  title: {
    type: String,
  },
  coverImage: {
    type: Buffer,
  },
  content: {
    type: String, // depend on text editor
  },
  text: {
    // for AI
    type: String,
  },
  author: {
    type: ObjectId,
    required: true,
  },
  // required
  views: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  ],
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      user: {
        type: ObjectId,
        required: true,
        ref: "User",
      },
    },
  ],
  tags: [String],
  isPublished: {
    type: Boolean,
    default: false,
  },
  textConnection: [
    {
      // the relevant connection to the post toPost
      toPost: {
        type: ObjectId,
        ref: "Post",
      },
      score: Number,
    },
  ],
  publishDate: Date,
  summary: String,
});

module.exports = model("Post", postSchema);
