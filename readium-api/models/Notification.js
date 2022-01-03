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
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3 * 30 * 24 * 60 * 60 * 1000,
  },
});

notificationSchema.methods.toJSON = function () {
  const notification = this.toObject();
  notification.id = notification._id;
  delete notification._id;
  delete notification.__v;
  return notification;
};

module.exports = model("Notification", notificationSchema);
