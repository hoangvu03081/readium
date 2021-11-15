const mongoose = require("mongoose");

const {
  model,
  Schema,
  Schema: { ObjectId },
} = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  coverImage: {
    type: Buffer,
    required: true,
  },
  content: {
    type: String, // depend on text editor
    required: true,
  },
  text: {
    // for AI
    type: String,
    required: true,
  },
  publishDate: {
    // when users publish the draft
    type: Date,
    required: true,
  },
  author: {
    type: ObjectId,
    required: true,
  },
  summary: String,
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
  views: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      user: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  tags: [String],
  isPublished: {
    type: Boolean,
    required: true,
  },
});

module.exports = model("Post", postSchema);
