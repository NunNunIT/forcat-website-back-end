// File: utils/common.ts

// export const BACKEND_URL: string = "https://forcat-wehttp://localhost:8080/bsite-back-end.onrender.com/api";
export const BACKEND_URL: string = "http://localhost:8080/api";
export const BACKEND_URL_ORDERS: string = BACKEND_URL + "/orders";
export const ORDER_STATUS_LIST: string[] = [
  "all",
  "unpaid",
  "delivering",
  "finished",
  "cancel",
];
export const BACKEND_URL_REVIEWS: string = BACKEND_URL + "/reviews";

export const CLOUDINARY_URL: string =
  "https://res.cloudinary.com/dmjwq3ebx/image/upload/v1712151655";
export const expirationTime = Date.now() + 86400000;
export const commonVariable2: number = 42;
