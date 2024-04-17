"use client";
// import libs
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";

// import css
import styles from "./logout.module.css";

const cx = classNames.bind(styles);

export default function MobileLogout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogoutClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <ul className={cx("side-menu")}>
        <li id="mobile-account__logout" onClick={handleLogoutClick}>
          <Link href="#" className={cx("btn-warranty")}>
            <span className={cx("material-icons-outlined")}>logout</span>
            <span className={cx("text")}>Đăng xuất</span>
          </Link>
        </li>
      </ul>
      {isModalVisible && (
        <div className={cx("mobile-account__popup")}>
          <div className={cx("popup__main")}>
            <div className={cx("popup__main--right")}>
              <div className={cx("popup__content")}>
                <div className={cx("popup--top")}>
                  <h5 className={cx("popup__title")}>Đăng xuất</h5>
                  <div className={cx("close-btn")} onClick={handleCloseModal}>
                    <span className={cx("material-icons-outlined")}>
                      cancel
                    </span>
                  </div>
                </div>
                <p className={cx("popup__subtitle")}>
                  Quý khách có chắc chắn muốn đăng xuất không?
                </p>
                <div className={cx("popup__button")}>
                  <button
                    className={cx("btn-cancel")}
                    type="button"
                    onClick={handleCloseModal}>
                    Hủy
                  </button>
                  <Link href="/" className={cx("btn-logout")}>
                    Đăng xuất
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
