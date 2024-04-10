import Notification from "../models/notification.model.js"; // Import model notification
import responseHandler from "../handlers/response.handler.js";
import { createSlug } from "../utils/createSlug.js";

export const getAllNoti = async (req, res, next) => {
  const userID = req.params.user_id; // test

  const page = parseInt(req.query.page) || 1; // Trang mặc định là 1
  const perPage = 10; // Số lượng thông báo trên mỗi trang

  try {
    const allNoti = await Notification.countDocuments({
      $or: [
        {
          "users.usersList": { $in: [{ _id: userID }] },
        },
        // Thêm điều kiện này để bỏ qua giá trị isRead
        { "users.usersList": { $elemMatch: { _id: userID } } },
        {
          "users.isAll": true,
        },
      ],
    });

    const totalPages = Math.ceil(allNoti / perPage); // Tính tổng số trang

    const noti = await Notification.find({
      $or: [
        {
          "users.usersList": { $in: [{ _id: userID }] },
        },
        // Thêm điều kiện này để bỏ qua giá trị isRead
        { "users.usersList": { $elemMatch: { _id: userID } } },
        {
          "users.isAll": true,
        },
      ],
    })
      .skip((page - 1) * perPage) // Bỏ qua thông báo trên các trang trước đó
      .limit(perPage); // Giới hạn số lượng thông báo trên mỗi trang
    // .exec();

    if (!noti) {
      return responseHandler.badRequest(res, "Empty");
    }

    return responseHandler.ok(res, { notifications: noti, totalPages });
  } catch (error) {
    return responseHandler.error(res);
  }
};

export const getNoti = async (req, res, next) => {
  const notiType = req.query.type; // Lấy từ truy vấn loại thông báo từ query parameter
  const userID = req.params.user_id; // test

  const page = parseInt(req.query.page) || 1; // Trang mặc định là 1
  const perPage = 10; // Số lượng thông báo trên mỗi trang

  try {
    const totalNoti = await Notification.countDocuments({
      $or: [
        {
          $and: [
            { notification_type: notiType },
            {
              "users.usersList": { $in: [{ _id: userID }] },
            },
            // Thêm điều kiện này để bỏ qua giá trị isRead
            { "users.usersList": { $elemMatch: { _id: userID } } },
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
    });

    const totalPages = Math.ceil(totalNoti / perPage); // Tính tổng số trang

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
      .skip((page - 1) * perPage) // Bỏ qua thông báo trên các trang trước đó
      .limit(perPage); // Giới hạn số lượng thông báo trên mỗi trang
    console.log("Console log:", noti);
    if (!noti) {
      return responseHandler.badRequest(res, "Empty");
    }

    return responseHandler.ok(res, { notifications: noti, totalPages });
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
              $elemMatch: { isRead: false },
            },
          },
        ],
      },
      {
        $set: { "users.usersList.$.isRead": true },
      }
    );

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
