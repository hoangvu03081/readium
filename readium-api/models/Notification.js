const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = require("mongoose");

const notificationSchema = new Schema({
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
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3 * 30 * 24 * 60 * 60,
  },
});

module.exports = notificationSchema;
