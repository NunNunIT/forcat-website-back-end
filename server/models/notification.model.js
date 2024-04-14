import mongoose from "mongoose";
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
      isAll: {
        type: Boolean,
        default: false,
      },
      usersList: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          isRead: {
            type: Boolean,
            default: false,
          },
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

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
