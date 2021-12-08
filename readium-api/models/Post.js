const mongoose = require("mongoose");

const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

function publishRqFnc() {
  return this.isPublished;
}

const postSchema = new Schema({
  author: {
    type: ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: [1, "Min 1, get {VALUE}"],
    maxlength: [100, "Max 100, get {VALUE}"],
  },
  coverImage: {
    type: Buffer,
    required: publishRqFnc,
  },
  textEditorContent: {
    default: '{ "ops": [] }',
    type: String,
  },
  content: {
    type: String,
    required: publishRqFnc,
  },
  publishDate: {
    type: Date,
    required: publishRqFnc,
  },
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
  textConnection: [
    {
      toPost: {
        type: ObjectId,
        ref: "Post",
      },
      score: Number,
    },
  ],
  isPublished: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 0,
  },
  tags: [String],
  description: String,
});

postSchema.methods.toJSON = function () {
  const postObject = this.toObject();
  delete postObject.coverImage;
  return postObject;
};

module.exports = model("Post", postSchema);
