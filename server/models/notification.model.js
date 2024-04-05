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
      required: true,
    },
    notification_type: {
      type: String,
      required: true,
    },
    notification_description: [
      {
        type: {
          type: String,
          enum: ["title", "image"],
          required: true,
        },
        content: String,
        url: String,
        alt: String,
        notification_date: Date,
      },
    ],
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
        },
      ],
    },
  },
  { timestamps: true }
);

notificationSchema.pre('save', function(next) {
  this.notification_slug = createSlug(this.notification_name);
  next();
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;