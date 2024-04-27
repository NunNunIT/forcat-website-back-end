import mongoose from "mongoose";
import User from "./user.model.js";
import { createSlug } from "../utils/createSlug.js";

const notificationSchema = new mongoose.Schema(
  {
    notification_name: {
      type: String,
      required: true,
    },
    notification_slug: {
      type: String,
    },
    notification_type: {
      type: String,
      required: true,
    },
    notification_description: String,
    users: {
      isAll: { type: Boolean, default: false, },
      usersList: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, ref: "User", },
          isUnread: { type: Boolean, default: true, },
        },
      ],
    },
  },
  { timestamps: true }
);

notificationSchema.pre("save", function (next) {
  this.notification_slug = createSlug(this.notification_name);
  next();
});

notificationSchema.post("save", async function (doc, next) {
  if (doc.users.isAll) {
    await User.updateMany({}, {
      $push: { recent_notification: { _id: doc._id, }, },
    });
    return next();
  }

  await User.updateMany(
    { _id: { $in: doc.users.usersList.map((user) => user._id) } },
    { $push: { recent_notification: { _id: doc._id, } } },
  );
  return next();
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
