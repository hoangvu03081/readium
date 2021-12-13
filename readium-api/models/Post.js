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

const requiredArr = [publishRqFnc, "This field is required when publish"];

const postSchema = new Schema({
  title: {
    type: String,
    default: "",
    required: requiredArr,
    maxlength: [100, "Max 100, get {VALUE}"],
  },
  textEditorContent: {
    type: String,
    default: '{ "ops": [] }',
    required: requiredArr,
  },
  author: { type: ObjectId, ref: "User", required: true },
  coverImage: { type: Buffer, required: requiredArr },
  content: { type: String, default: "", required: requiredArr },
  publishDate: { type: Date, required: requiredArr },
  publishedPost: { type: ObjectId, ref: "Post" },
  isPublished: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: [{ type: ObjectId, required: true, ref: "User" }],
  comments: [{ type: ObjectId, ref: "Comment", required: true }],
  textConnection: [
    {
      toPost: {
        type: ObjectId,
        ref: "Post",
      },
      score: Number,
    },
  ],
  duration: { type: Number, default: 0 },
  tags: [String],
  description: { type: String, default: "" },
});

postSchema.methods.getPostPreview = async function () {
  await this.populate("author", { displayName: 1 });
  const postObject = this.toObject();

  postObject.id = postObject._id;
  postObject.likes = postObject.likes.length;
  postObject.comments = postObject.comments.length;

  if (postObject.coverImage) {
    postObject.coverImageUrl = getImageUrl(postObject.id);
  }
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
  if (postObject.coverImage) {
    postObject.coverImageUrl = getImageUrl(postObject.id);
  }
  postObject.author.avatar = getAvatarUrl(postObject.author._id);

  delete postObject.coverImage;
  delete postObject.author._id;
  delete postObject.__v;
  delete postObject._id;

  return postObject;
};

postSchema.methods.toJSON = function () {
  const post = this.toObject();
  delete post.coverImage;
  delete post.__v;
  return post;
};

module.exports = model("Post", postSchema);
