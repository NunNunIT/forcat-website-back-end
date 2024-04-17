export default function convertOrderStatusToStr(order_status) {
  if (!order_status) {
    return "Chưa xác định";
  }

  switch (order_status.toLowerCase()) {
    case "all":
      return "Tất cả";
    case "unpaid":
      return "Chờ thanh toán";
    case "delivering":
      return "Đang giao";
    case "finished":
      return "Hoàn thành";
    case "cancel":
      return "Đã hủy";
  }

  return "Unexpected Order Status";
}