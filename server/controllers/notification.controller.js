import Notification from "../models/notification.model.js"; // Import model notification
import responseHandler from "../handlers/response.handler.js";

export const getAllNoti = async (req, res, next) => {
  const notiType = req.query.type; // Lấy từ truy vấn loại thông báo từ query parameter
  const userID = req.params.user_id; // test

  try {
    const noti = await Notification.find({
      $or: [
        {
          $and: [
            { notification_type: notiType },
            {
              "users.usersList": { $in: [{ _id: userID }] },
            },
          ],
        },
        {
          $and: [
            { notification_type: notiType },
            {
              "users.isAll": true,
            },
          ],
        },
      ],
    })

    if (!noti) {
      return responseHandler.badRequest(res, "Empty");
    }

    return responseHandler.ok(res, noti);
  } catch (error) {
    return responseHandler.error(res);
  }
};

export const setReadNoti = async (req, res, next) => {
  try {
    const notificationId = req.params.noti_id; // test
    const userID = req.params.user_id; // test
    const notification = await Notification.findOneAndUpdate(
      {
        $and: [
          { _id: notificationId },
          { "users.usersList": { $in: [{ _id: userID }] } },
          {
            "users.usersList": {
              $elemMatch: { isRead: true },
            },
          },
        ],
      },
      {
        $unset: { "users.usersList.$.isRead": "" },
      }
    ).exec();

    if (!notification) {
      return responseHandler.badRequest(res, "Empty");
    }

    await notification.save();

    return responseHandler.ok(res, notification);
  } catch (error) {
    return responseHandler.error(res);
  }
};

export const setReadAllNoti = async (req, res, next) => {
  try {
    const userID = req.params.user_id; // test

    const unReadNotifications = await Notification.find({
      $and: [
        {
          "users.usersList": {
            $elemMatch: { isRead: true },
          },
        },
        { "users.usersList": { $in: [{ _id: userID }] } },
      ],
    }).exec();

    // console.log("--------------------------", unReadNotifications);

    if (unReadNotifications.length === 0) {
      return responseHandler.ok(res, unReadNotifications);
    }

    const updateAll = await Notification.updateMany(
      {
        $and: [
          {
            "users.usersList": {
              $elemMatch: { isRead: true },
            },
          },
          { "users.usersList": { $in: [{ _id: userID }] } },
        ],
      },
      { $unset: { "users.usersList.$.isRead": "" } }
    ).exec();

    // console.log("==========================", updateAll);

    if (!updateAll) {
      return responseHandler.badRequest(res, "Empty");
    }

    return responseHandler.ok(res, updateAll);
  } catch (error) {
    return responseHandler.error(res);
  }
};
