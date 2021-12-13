const {
  model,
  Schema,
  SchemaTypes: { ObjectId },
} = require("mongoose");

// limit to 50 notifications, no longer than 3 months
const notificationSchema = new Schema({
  from: { type: ObjectId, ref: "User", required: true },
  to: { type: ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, expires: 3 },
  // test
  // expires: 3 * 30 * 24 * 60 * 60,
});

module.exports = model("Notification", notificationSchema);
