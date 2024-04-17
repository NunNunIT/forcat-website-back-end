// import css
import "./layout.css";
import type { Metadata } from "next";

// import partials, components
import { CustomerNotificationAside } from "./partials";

export const metadata: Metadata = {
  title: "Thông báo",
  description:
    "Trang này cung cấp thông tin quan trọng và cập nhật từ ForCat Shop.",
};

export default function NotificationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="notification-container">
      <CustomerNotificationAside />
      {children}
    </main>
  );
}
