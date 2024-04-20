import { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Quản lý và cập nhật thông tin cá nhân của bạn trên ForCat Shop.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
