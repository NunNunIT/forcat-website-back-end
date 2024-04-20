"use client";

// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// import utils
import { isActiveClass } from "@/utils";
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import styles from "./account-aside.module.css";

const cx = classNames.bind(styles);

const asideNavData = [
  {
    url: "/account/information",
    iconData: "perm_contact_calendar",
    text: "Thông tin cá nhân",
  },
  {
    url: "/account/purchase-history",
    iconData: "shopping_bag",
    text: "Lịch sử đơn mua",
  },
  {
    url: "/account/change-password",
    iconData: "settings",
    text: "Đổi mật khẩu",
  },
];

export default function CustomerAccountAside() {
  const pathName = usePathname();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/getInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Error in fetchUser:", error);
      return null;
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      if (user) {
        setUser(user);
      }
    };

    getUser();
  }, []);
  const {
    user_name = "Chưa thiết lập",
    user_avt_img = "",
  } = user ?? {};

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        localStorage.removeItem("currentUser");
        window.location.reload(); // Đặt currentUser thành null sau khi đăng xuất
      } else {
        console.error("Logout failed:", await res.text());
      }
    } catch (error) {
      // console.error("Logout error:", error);
    }
  };

  return (
    <aside className={cx("account__aside")}>
      <div className={cx("account__avatar")}>
        <div className={cx("account__avatar-container")}>
          <Image src={user_avt_img} alt="Avatar" fill />
        </div>
        <span className={cx("account__user-name")}>{user_name}</span>
      </div>
      <hr />
      <nav>
        <ul className={cx("account__aside-nav")}>
          {asideNavData.map((navData, index) => (
            <li key={index}>
              <Link
                href={navData.url}
                className={cx(
                  "account__aside-nav-item",
                  isActiveClass(navData.url, pathName)
                )}>
                <span className="material-icons">{navData.iconData}</span>
                <span>{navData.text}</span>
              </Link>
            </li>
          ))}
          <li key={asideNavData.length}>
            <button
              onClick={handleLogout}
              className={cx("account__aside-nav-item", "dangerous-action")}>
              <span className="material-icons">logout</span>
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
