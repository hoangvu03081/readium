const mongoose = require("mongoose");
const { getAvatarUrl, getImageUrl } = require("../utils");
const commentSchema = require("./Comment");

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
    ref: "User",
    type: ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: publishRqFnc,
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
  publishedPost: {
    ref: "Post",
    type: ObjectId,
  },
  isPublished: {
    type: Boolean,
    default: false,
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
  comments: { type: [commentSchema], default: () => [] },
  textConnection: [
    {
      toPost: {
        type: ObjectId,
        ref: "Post",
      },
      score: Number,
    },
  ],
  duration: {
    type: Number,
    default: 0,
  },
  tags: [String],
  description: String,
});

postSchema.methods.getPostPreview = async function () {
  await this.populate("author", { displayName: 1 });
  const postObject = this.toObject();

  postObject.id = postObject._id;
  postObject.likes = postObject.likes.length;
  postObject.comments = postObject.comments.length;

  postObject.coverImageUrl = getImageUrl(postObject.id);
  postObject.author.avatar = getAvatarUrl(postObject.author._id);

  delete postObject.coverImage;
  delete postObject.author._id;
  delete postObject.__v;
  delete postObject._id;
  delete postObject.textEditorContent;
  delete postObject.textConnection;

  return postObject;
};

postSchema.methods.getPostDetail = async function () {
  await this.populate("author", { displayName: 1 });
  const postObject = this.toObject();

  postObject.id = postObject._id;
  // postObject.coverImageUrl = getImageUrl(postObject.id);
  // postObject.author.avatar = getAvatarUrl(postObject.author._id);

  delete postObject.coverImage;
  delete postObject.author._id;
  delete postObject.__v;
  delete postObject._id;
  delete postObject.textConnection;

  return postObject;
};

module.exports = model("Post", postSchema);
