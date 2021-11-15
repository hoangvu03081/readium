const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { collectionSchema } = require("./Collection");

const {
  model,
  Schema,
  Schema: { ObjectId },
} = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  fullname: {
    type: String,
    required: true,
  },
  biography: String,
  job: String,
  avatar: Buffer,
  followers: {
    type: ObjectId,
    ref: "User",
  },
  followings: {
    type: ObjectId,
    ref: "User",
  },
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
  activation_link: String,
  activated: {
    type: Boolean,
    required: true,
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
});

const saltRounds = 10;

// hash user password pre save
userSchema.pre("save", async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

module.exports = model("User", userSchema);
