const mongoose = require("mongoose");
const {
  getAvatarUrl,
  getDraftCoverImageUrl,
  getPostCoverImageUrl,
} = require("../utils");

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
  },
  author: { type: ObjectId, ref: "User", required: true },
  coverImage: { type: Buffer, required: requiredArr },
  content: { type: String, default: "" },
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
    if (postObject.isPublished)
      postObject.coverImage = getPostCoverImageUrl(postObject.id);
    else postObject.coverImage = getDraftCoverImageUrl(postObject.id);
  }
  postObject.author.avatar = getAvatarUrl(postObject.author._id);

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

  postObject.id = postObject._id.toString();
  if (postObject.coverImage) {
    if (postObject.isPublished) {
      postObject.coverImage = getPostCoverImageUrl(postObject.id);
    } else {
      postObject.coverImage = getDraftCoverImageUrl(postObject.id);
    }
  }
  postObject.author.avatar = getAvatarUrl(postObject.author._id);

  delete postObject.author._id;
  delete postObject.__v;
  delete postObject._id;

  return postObject;
};

postSchema.methods.toJSON = function () {
  const post = this.toObject();
  if (post.author._id && post.author.profileId) {
    const userObject = post.author;
    userObject.id = userObject._id.toString();
    userObject.avatar = getAvatarUrl(userObject.id);
    if (userObject.coverImage) {
      userObject.coverImage = getCoverImageUrl(userObject.id);
    }
    userObject.followers = userObject.followers.length;
    userObject.followings = userObject.followings.length;

    delete userObject.email;
    delete userObject.activated;
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.notifications;
    delete userObject.activationLink;
    delete userObject.resetLink;
    delete userObject.resetTimeout;
    delete userObject.__v;
    delete userObject._id;
    delete userObject.liked;
  }
  delete post.coverImage;
  delete post.__v;
  return post;
};

module.exports = model("Post", postSchema);
