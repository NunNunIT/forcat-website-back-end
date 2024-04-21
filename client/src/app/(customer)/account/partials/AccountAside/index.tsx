"use client";

// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// import utils
import { isActiveClass } from "@/utils";
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import styles from "./account-aside.module.css";

const cx = classNames.bind(styles);

const fetchData = {
  user_name: "Lê Trung Hiếu",
  avatar_url: "/imgs/test.png",
};

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
  const { user_name, avatar_url } = fetchData;

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

      if (!res.ok) {
        console.error("Logout failed: ", await res.text());
        return;
      }

      localStorage.removeItem("currentUser");
      window.location.reload();
      return;
    } catch (error) {
      // return notFound();
    }
  };


  return (
    <aside className={cx("account__aside")}>
      <div className={cx("account__avatar")}>
        <div className={cx("account__avatar-container")}>
          <Image src={avatar_url} alt="Avatar" fill />
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
                )}
              >
                <span className="material-icons">{navData.iconData}</span>
                <span>{navData.text}</span>
              </Link>
            </li>
          ))}
          <li>
            <form onSubmit={handleLogout}>
              <button
                type="submit"
                className={
                  cx(
                    "account__aside-nav-item",
                    "dangerous-action"
                  )
                }
              >
                <span className="material-icons">logout</span>
                <span>Đăng xuất</span>
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
