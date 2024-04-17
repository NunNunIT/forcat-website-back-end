// import libs
import React from "react";
import Image from "next/image";
import Link from "next/link";

// import partials
import { MobileLogout } from "./partials";

// import css
import "./page.css";

export default function MobileAccountPage() {
  return (
    <main className="mobile-account-container">
      <aside className="account-aside" id="sidebar">
        <Link href="#" className="avatar">
          <span className="image-container">
            {/* <img src="/imgs/user_avt_img/<%= (user.user.user_avt_img) ? user.user.user_avt_img : 'default.png' %>" alt="avatar <%= (user.user.user_name) ? user.user.user_name : '' %>"> */}
            <Image
              className="avatarimg"
              src="/imgs/test.png"
              alt="avatar"
              fill={true}
            />
          </span>
          <div className="user_name">
            <h5>user name</h5>
          </div>
        </Link>

        <ul className="side-menu top">
          <li>
            <Link href="/account/information" id="info-link">
              <span className="material-icons-outlined">
                perm_contact_calendar
              </span>
              <span className="text">Thông tin cá nhân</span>
              <span className="material-icons-outlined arrow-icon">
                navigate_next
              </span>
            </Link>
          </li>

          <li>
            <Link href="/account/purchase-history">
              <span className="material-icons-outlined"> shopping_bag </span>
              <span className="text">Lịch sử đơn mua</span>
              <span className="material-icons-outlined arrow-icon">
                navigate_next
              </span>
            </Link>
          </li>
          <li>
            <Link href="/account/change-password">
              <span className="material-icons-outlined"> settings </span>
              <span className="text">Đổi mật khẩu</span>
              <span className="material-icons-outlined arrow-icon">
                navigate_next
              </span>
            </Link>
          </li>
        </ul>
        <MobileLogout></MobileLogout>
      </aside>
    </main>
  );
}
