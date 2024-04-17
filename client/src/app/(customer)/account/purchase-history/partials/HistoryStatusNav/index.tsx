"use client";

// import libs
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import classNames from "classnames/bind";

// import utils
import { isActiveClass, convertOrderStatusToStr } from "@/utils";

// import css
import styles from "./history-status-nav.module.css";

const cx = classNames.bind(styles);

export default function HistoryStatusNav() {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "all";
  const pathName = usePathname();

  return (
    <nav className={cx("purchase-history__status-container")}>
      {["all", "unpaid", "delivering", "finished", "cancel"].map((status) => (
        <Link
          key={status}
          className={cx(
            "purchase-history__status",
            isActiveClass(currentStatus, status)
          )}
          href={pathName + "?" + (status === "all" ? "" : `status=${status}`)}>
          {convertOrderStatusToStr(status)}
        </Link>
      ))}
    </nav>
  );
}
