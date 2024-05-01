import responseHandler from "../handlers/response.handler.js";
import isValidWebHookData from "../utils/securityPayment.js";

export default async function verifyPaymentData(req, res, next) {
  const webhook = req.body;
  const { code, data, signature, desc } = webhook;
  if (!code || !data || !signature || !desc)
    return responseHandler.badRequest(res, "Missing payment data");
  const isValid = isValidWebHookData(webhook);

  if (!isValid)
    return responseHandler.badRequest(res, "Invalid payment data");

  req.webhookData = webhook.data;

  next();
}