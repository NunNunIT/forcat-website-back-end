"use client";

// import libs
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import { usePathname, useSearchParams } from "next/navigation";

// import utils
import { isActiveClassWithBool } from "@/utils";

// import css
import styles from "./notification-aside.module.css";

const cx = classNames.bind(styles);

const fetchData = {
  user_name: "Lê Trung Hiếu",
  avatar_url: "/imgs/test.png",
};

const asideNavData = [
  {
    url: "/notifications",
    text: "Tất cả",
  },
  {
    url: "/notifications?type=order",
    text: "Đơn hàng",
  },
  {
    url: "/notifications?type=promotion",
    text: "Khuyến mãi",
  },
];

export default function NotificationAside() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { user_name, avatar_url } = fetchData;

  const type = searchParams.get("type");
  const currentURL: string = [pathName, type ? `?type=${type}` : ""].join("");

  return (
    <aside className={cx("notification__aside")}>
      <div className={cx("notification__avatar")}>
        <div className={cx("notification__avatar-container")}>
          <Image src={avatar_url} alt="Avatar" fill />
        </div>
        <span className={cx("notification__user-name")}>{user_name}</span>
      </div>
      <hr />
      <nav>
        <ul className={cx("notification__aside-nav")}>
          {asideNavData.map((navData, index) => (
            <li key={index}>
              <Link
                href={navData.url}
                className={cx(
                  "notification__aside-nav-item",
                  isActiveClassWithBool(navData.url === currentURL)
                )}
              >
                <span>{navData.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
