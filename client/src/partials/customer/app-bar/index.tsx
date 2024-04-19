"use client";

// use bind from classnames
import classNames from "classnames/bind";
import Link from "next/link";
import { usePathname } from "next/navigation";

// use scss
import styles from "./styles.module.css";

const cx = classNames.bind(styles);

const appBarData = [
  {
    url: "/",
    iconData: "home",
    text: "Trang chủ",
  },
  {
    url: "/category",
    iconData: "category",
    text: "Danh mục",
  },
  {
    url: "/news",
    iconData: "article",
    text: "Tin tức",
  },
  {
    url: "/search/results?hotProduct=true",
    iconData: "local_fire_department",
    text: "HOT",
  },
  {
    url: ["/account/mobile-account", "/login", "/register", "/forgot"],
    iconData: "account_circle",
    text: "Tài khoản",
  },
];

export default function AppBar() {
  const pathName = usePathname();
  return (
    <div className={cx("app-bar")}>
      <div className={cx("app-bar__container")}>
        {appBarData.map((navData, index) => {
          const isActive = Array.isArray(navData.url)
            ? navData.url.includes(pathName)
            : pathName === navData.url;
          return (
            <div key={index} className={cx("app-bar__element")}>
              <Link href={navData.url[0]} className={cx({ active: isActive })}>
                <span
                  className={cx("material-icons-outlined nav__icon", {
                    active: isActive,
                  })}>
                  {navData.iconData}
                </span>
              </Link>
              <Link href={navData.url[0]} className={cx({ active: isActive })}>
                {navData.text}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
