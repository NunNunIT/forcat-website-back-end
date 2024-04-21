// import libs
import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

// import css
import "./page.css";

export const metadata: Metadata = {
  description:
    "Quản lý và cập nhật thông tin cá nhân của bạn trên ForCat Shop.",
};
export default async function InformationPage() {
  return (
    <main className="account-information__main">
      <section className="information__main">
        <div className="information__main__item">
          <div className="information-item">
            <div className="information-item--top">
              <div className="information-item__info">
                <h3>Thông tin cá nhân</h3>
              </div>
              <h3>
                <Link
                  className="information-item__edit"
                  href="/account/edit-information">
                  Sửa
                </Link>
              </h3>
            </div>
            <div className="information-item__main">
              <div className="information-item__product-detail">
                <div className="information-item__product-name">
                  <h5>Tên người dùng:</h5>
                  <span>Lê Trung Hiếu</span>
                </div>
                <div className="information-item__product-name">
                  <h5>Ngày sinh:</h5>
                  <span>01/01/1990</span>
                </div>

                <div className="information-item__product-name">
                  <h5>Giới tính:</h5>
                  <span>NAM</span>
                </div>

                <div className="information-item__product-name">
                  <h5>Email:</h5>
                  <span>A@GMAIL.COM</span>
                </div>

                <div className="information-item__product-name">
                  <h5>Số điện thoại:</h5>
                  <span>0123456789</span>
                </div>

                <div className="information-item__product-name">
                  <h5>Địa chỉ:</h5>
                  <span>1, ĐƯỜNG 1, QUẬN 1, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
