// import libs
import classNames from "classnames/bind";
import Image from "next/image";
import type { Metadata } from "next";

// import components
import { AuthLoginForm } from "@/components";

// import css
import styles from "../auth.module.css";

const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: "Đăng nhập",
  description:
    "Đăng nhập vào ForCat để trải nghiệm mua sắm tuyệt vời. Tạo tài khoản ngay hôm nay để kết nối với sản phẩm mới, nhận ưu đãi đặc biệt và cơ hội tham gia vào các sự kiện hấp dẫn. Duyệt qua bộ sưu tập sản phẩm phong phú và chăm sóc thú cưng của bạn một cách dễ dàng và tiện lợi.",
};

const LoginPage = () => {
  return (
    <main className={cx("auth_main")}>
      <div className={cx("auth__image-wrap", "login")}>
        <Image
          className={cx("auth__image")}
          src="/imgs/auth/meo-1.png"
          alt="Anh meo vang"
          fill={true}
        />
      </div>
      <div className={cx("auth__forms-wrap", "login")}>
          <AuthLoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
