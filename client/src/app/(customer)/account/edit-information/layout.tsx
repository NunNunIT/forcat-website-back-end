// import libs
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Cập nhật và chỉnh sửa thông tin cá nhân của bạn trên ForCat Shop. Trang này cho phép bạn thay đổi các chi tiết như địa chỉ, số điện thoại, và thông tin thanh toán.",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
