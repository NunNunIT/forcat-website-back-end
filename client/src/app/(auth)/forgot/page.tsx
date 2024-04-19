// import libs
import type { Metadata } from "next";
import React from "react";
import classNames from "classnames/bind";
import Image from "next/image";

// import components
import { AuthForgotForm } from "@/components";

// import css
import styles from "../auth.module.css";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Quên mật khẩu | Không thể đăng nhập",
  description:
    "Quên mật khẩu? Đừng lo lắng! Trang này cho phép bạn khôi phục mật khẩu của mình một cách đơn giản và nhanh chóng.",
};

export default function ForgotPage() {
  return (
    <main className={cx("main-container")}>
      <div className={cx("auth_main")}>
        <div className={cx("auth__image-wrap", "login")}>
          <Image
            className={cx("auth__image")}
            src="/imgs/auth/meo-1.png"
            alt="Anh meo vang"
            fill={true}
          />
        </div>
        <div className={cx("auth__forms-wrap", "login")}>
          <AuthForgotForm />
        </div>
      </div>
    </main>
  );
}
