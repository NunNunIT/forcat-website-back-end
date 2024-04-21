// import libs
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description:
    "Xem lại các sản phẩm bạn đã thêm vào giỏ hàng trên ForCat Shop. Tiếp tục mua sắm hoặc tiến hành thanh toán để hoàn tất đơn hàng của bạn.",
};

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
