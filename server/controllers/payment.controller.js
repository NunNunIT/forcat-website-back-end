import PayOS from "@payos/node";
import responseHandler from "../handlers/response.handler.js";
import hashString from "../utils/hashStringIntoInt.js";
import Order from "../models/order.model.js";

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY,
);

const COUNT_PAYMENT_DATA = {
  description: "Thanh toan don hang",
  cancelUrl: "https://www.forcatshop.com/account/purchase-history?type=unpaid",
  returnUrl:
    "https://www.forcatshop.com/account/purchase-history?type=delivering",
};

export const paymentLinkData = async (req, res) => {
  const user_id = req.user?.id;
  const role = req.user?.role;

  if (!user_id) return responseHandler.unauthorize(res);
  if (!role || role !== "user") return responseHandler.forbidden(res);

  const { ...paymentData } = req.body;

  const orderCode = hashString(user_id + Date.now());
  const { amount } = paymentData;

  if (!amount) return responseHandler.badRequest(res);

  try {
    const res_data = await payos.createPaymentLink({
      ...COUNT_PAYMENT_DATA,
      orderCode,
      amount,
    });

    return responseHandler.created(res, res_data);
  } catch (err) {
    console.log("không tạo được link thanh toán", err);
  }
};

export const updateStatusOrderAfterPayment = async (req, res) => {
  const { orderCode } = req.webhookData;
  const order = await Order.findOne({ orderCode });
  if (!order) return responseHandler.notFound(res);

  // Update order_status, order_process_info
  await Order.findOneAndUpdate(query, {
    $set: { order_status: "delivering" },
    $push: { order_process_info: { status: "delivering", date: new Date() } }
  })

  // Create notification
  const notiOrder = {
    notification_name: "Thông báo cập nhật đơn hàng",
    notification_type: "order",
    notification_description: `
        <p>Đơn hàng <b>${order_id}</b> của bạn đã được
        cập nhật tình trạng thành: ${convertOrderStatusToStr(order_status)}</p>
      `,
    users: {
      usersList: [
        { _id: order.customer_id },
      ],
    },
  };

  await Notification.create(notiOrder);

  return res.json();
}