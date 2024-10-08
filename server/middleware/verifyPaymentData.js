import isValidWebHookData from "../utils/securityPayment.js";

export default async function verifyPaymentData(req, res, next) {
  const webhook = req.body;
  const { code, data, signature, desc } = webhook;
  if (!code || !data || !signature || !desc)
    return res.json();
  const isValid = isValidWebHookData(webhook);

  if (!isValid)
    return res.json();

  req.webhookData = webhook.data;

  next();
}