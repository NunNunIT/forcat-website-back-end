// import libs
import classNames from "classnames/bind";
import Image from "next/image";
import type { Metadata } from "next";

// import components
import { AuthRegisterForm } from "@/components";

// import css
import styles from "../auth.module.css";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Đăng ký",
  description:
    "Tham gia cộng đồng ForCat ngay hôm nay! Đăng ký tài khoản để trải nghiệm mua sắm thú vị, khám phá bộ sưu tập sản phẩm đa dạng và nhận những ưu đãi đặc biệt dành riêng cho thành viên. Dễ dàng đăng ký với chỉ vài bước đơn giản và bắt đầu cuộc hành trình chăm sóc thú cưng của bạn cùng ForCat ngay bây giờ!",
};

const RegisterPage = () => {
  return (
    <main className={cx("auth_main")}>
      <div className={cx("auth__forms-wrap", "register")}>
        <AuthRegisterForm />
      </div>
      <div className={cx("auth__image-wrap", "register")}>
        <Image
          className={cx("auth__image")}
          src="/imgs/auth/meo-7.png"
          alt="Anh meo vang"
          fill={true}
        />
      </div>
    </main>
  );
};

export default RegisterPage;
