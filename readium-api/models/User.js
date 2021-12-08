const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const collectionSchema = require("./Collection");

const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  displayName: {
    // display name
    type: String,
    required: true,
  },
  biography: String,
  job: String,
  avatar: Buffer,
  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  followings: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  notifications: [
    // limit to 50 notifications, no longer than 3 months
    {
      user: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      url: {
        // link to some page
        type: String,
        required: true,
      },
    },
  ],
  activated: {
    type: Boolean,
    default: false,
  },
  collections: {
    default: [
      {
        name: "Default Collection",
        posts: [],
      },
    ],
    type: [collectionSchema],
  },
  activationLink: String,
  resetLink: String,
  resetTimeout: Date,
  profileId: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: [String],
  // liked: [
  //   {
  //     type: ObjectId,
  //     required: true,
  //     ref: "Post",
  //   },
  // ],
  facebook: String,
  twitter: String,
  instagram: String,
  mail: String,
});

userSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.avatar;
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.notifications;
  delete userObject.activated;
  delete userObject.activationLink;
  delete userObject.resetLink;
  delete userObject.__v;
  delete userObject._id;
  userObject.followers = userObject.followers.length;
  userObject.followings = userObject.followings.length;
  // delete userObject.liked;
  return userObject;
};

const saltRounds = 10;

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, saltRounds);
};

module.exports = model("User", userSchema);
