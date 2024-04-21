import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch sử mua hàng",
  description:
    "Xem lại lịch sử các đơn hàng bạn đã đặt trên ForCat Shop. Trang này cung cấp cho bạn thông tin chi tiết về các đơn hàng trước đây, bao gồm các sản phẩm đã mua, tổng số tiền thanh toán, và trạng thái của đơn hàng.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
