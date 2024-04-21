// import components
import { CustomerAccountAside } from "./partials";
import type { Metadata } from "next";

// import css
import "./layout.css";

export const metadata: Metadata = {
  title: {
    template: "Tài khoản | %s ",
    default: "Tài khoản",
  },
  description:
    "Quản lý thông tin cá nhân, đơn hàng và cập nhật tài khoản của bạn trên ForCat Shop.",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="account-container">
      <CustomerAccountAside />
      {children}
    </main>
  );
}
