import type { Metadata } from "next";

// import css

export const metadata: Metadata = {
  description:
    "Thay đổi mật khẩu của bạn để bảo vệ thông tin cá nhân và tài khoản trên ForCat Shop. Trang này cho phép bạn cập nhật mật khẩu hiện tại và thiết lập mật khẩu mới một cách an toàn",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
