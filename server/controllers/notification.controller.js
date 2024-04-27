import Notification from "../models/notification.model.js"; // Import model notification
import responseHandler from "../handlers/response.handler.js";

// [GET] /api/notifications
export const getAllNoti = async (req, res, next) => {
  const user_id = req.user?.id;
  if (!user_id) {
    return responseHandler.unauthorize(res, "You are not authenticated!");
  }

  const role = req.user?.role;
  if (!["admin", "staff", "user"].includes(role)) {
    return responseHandler.forbidden(res, "You are not authorized!");
  }

  const type = req.query?.type; // Lấy từ truy vấn loại thông báo từ query parameter

  const page = (parseInt(req.query?.page) > 0) ? parseInt(req.query?.page) : 1; // Trang mặc định là 1
  const limit = (parseInt(req.query?.limit) > 0) ? parseInt(req.query?.limit) : 10; // Số lượng thông báo trên mỗi trang

  const query = {
    $and: [
      { ...(type ? { notification_type: type } : {}) },
      {
        $or: [
          { "users.usersList": { $elemMatch: { _id: user_id } } },
          { "users.isAll": true, },
        ],
      }
    ]
  };

  try {
    const maxPage = Math.ceil(await Notification.find(query).countDocuments() / limit); // Tính tổng số trang
    const notifications = await Notification.find(query)
      .skip((page - 1) * limit) // Bỏ qua thông báo trên các trang trước đó;
      .limit(limit) // Giới hạn số lượng thông báo trên mỗi trang
      .sort({ createdAt: -1 })
      .exec();

    const handledNotifications = notifications.map(
      notification => {
        const { users, ...rest } = notification._doc;
        const user = users?.usersList?.find(user => user._id.toString() === user_id);
        return {
          ...rest,
          user,
          // Nếu isAll = true thì kiểm tra user._id có trong usersList không
          // - Nếu có => chưa đọc => true
          // - Nếu không có => đã đọc => false
          // Nếu isAll = false thì kiểm tra user._id có trong usersList không
          // - Nếu có ---- Chắc chắn có
          //   => kiểm tra isUnread
          //   - Nếu không tồn tại hoặc bằng false => đã đọc => false
          //   - Nếu isUnread = true => chưa đọc => true
          is_unread: (users.isAll && user)
            || (!users.isAll && user.isUnread)
        }
      }
    )

    return responseHandler.ok(res, { notifications: handledNotifications, maxPage });
  } catch (error) {
    next(error);
  }
};

// [POST] /api/notifications/:noti_id/read
export const setReadNoti = async (req, res, next) => {
  const user_id = req.user?.id;
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role;
  if (!role || !["user"].includes(role))
    return responseHandler.forbidden(res, "You are not authorized!");

  const notification_id = req.params.noti_id;

  const query = {
    _id: notification_id,
    $or: [
      { "users.isAll": true, },
      { "users.usersList": { $elemMatch: { _id: user_id } }, },
    ]
  }

  try {
    const notification = await Notification.findOne(query).exec();
    if (!notification)
      return responseHandler.badRequest(res, "Not Found that notification!");

    // const userIndex = notification.users.usersList.findIndex(user => user._id.toString() === user_id);

    await notification.updateOne(
      { $pull: { "users.usersList": { _id: user_id } } },
      { new: true },
    );

    if (!notification.users.isAll) {
      // Nếu thông báo không phải là tất cả thì cập nhật isUnread của user là null
      await notification.updateOne(
        { $push: { "users.usersList": { _id: user_id, isUnread: null } } },
        { new: true },
      )
    }

    return responseHandler.ok(res, notification);
  } catch (error) {
    next(error);
  }
};

// [POST] /api/notifications/readAll
export const setReadAllNoti = async (req, res, next) => {
  const user_id = req.user?.id;
  if (!user_id)
    return responseHandler.unauthorize(res, "You are not authenticated!");

  const role = req.user?.role;
  if (!role || !["user"].includes(role))
    return responseHandler.forbidden(res, "You are not authorized!");

  try {
    await Promise.All([
      Notification.updateMany(
        { "users.isAll": true, },
        { $pull: { "users.usersList": { _id: user_id } } },
        { new: true },
      ).exec(),
      Notification.updateMany(
        { "users.usersList": { $elemMatch: { _id: user_id } } },
        { $set: { "users.usersList.$.isUnread": null } },
        { new: true },
      ).exec(),
    ]);
    return responseHandler.ok(res, updateAll);
  } catch (error) {
    return responseHandler.error(res);
  }
};
