// import libs
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// import partials
import { CustomerHeader, CustomerFooter, CustomerAppBar } from "@/partials";

// import css
import "./not-found.css";

export const metadata: Metadata = {
  title: "404 Page",
  description:
    "Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. ForCat Shop luôn cố gắng cập nhật và cung cấp các trang thông tin đầy đủ và chính xác nhất. Vui lòng kiểm tra lại đường dẫn hoặc quay trở lại trang chủ để tìm kiếm thông tin khác. Chân thành xin lỗi về sự bất tiện này và cảm ơn bạn đã ghé thăm ForCat Shop!",
};

export default function NotFound() {
  return (
    <>
      <CustomerHeader></CustomerHeader>
      <main className="not-found-container">
        <div className="not-found__image-div">
          <Image
            src="/imgs/not-found-page/not-found.webp"
            alt="Trang bạn truy cập không tồn tại"
            fill={true}
          />
        </div>
        <p className="not-found__text">
          Trang bạn đang truy cập hiện không khả dụng
        </p>
        <Link className="not-found__button" href="/">
          Về trang chủ
        </Link>
      </main>
      <CustomerFooter></CustomerFooter>
      <CustomerAppBar></CustomerAppBar>
    </>
  );
}
