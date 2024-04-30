import PayOS from "@payos/node";
import responseHandler from "../handlers/response.handler.js";
import hashString from "../utils/hashStringIntoInt.js";

const payos = new PayOS(
  "a6f6345d-6892-475c-a422-3dd3ee69d3c9",
  "4daf8611-1745-483a-8f0a-eafe16d12b5d",
  "fcb5dcf88ddb665dcbb80805e928880a4248ba22d282c9ce5d75cb40fc32919d"
);

const COUNT_PAYMENT_DATA = {
  description: "Thanh toan don hang",
  cancelUrl: "https://www.forcatshop.com/account/purchase-history?type=unpaid",
  returnUrl:
    "https://www.forcatshop.com/account/purchase-history?type=delivering",
};

export const paymentLinkData = async (req, res) => {
  const { user_id, ...paymentData } = req.body;
  const orderCode = hashString(user_id + Date.now());
  const { amount } = paymentData;

  if (!amount) return responseHandler.badRequest(res);

  // const user_id = req.user?.id;

  if (!user_id) return responseHandler.unauthorize(res);

  // const role = req.user?.role;
  // if (!role || role !== "user") return responseHandler.forbidden(res);

  try {
    const res_data = await payos.createPaymentLink({
      ...COUNT_PAYMENT_DATA,
      orderCode,
      amount,
    });

    return responseHandler.created(res, res_data);
  } catch (err) {
    next(err);
  }
};
