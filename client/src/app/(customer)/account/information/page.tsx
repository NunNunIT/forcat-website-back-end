"use client"
// import libs
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { BACKEND_URL } from "@/utils/commonConst";
// import css
import "./page.css";


export default function InformationPage() {
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

  // if (!user) {
  //   return <div>Loading...</div>;
  // }
  // Extract user information from currentUser
  const {
    user_name = "Chưa thiết lập",
    user_birth = new Date(),
    user_gender = "Chưa thiết lập",
    user_phone = "Chưa thiết lập",
    user_address = "Chưa thiết lập",
  } = user ?? {};

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
                  <span>{user_name}</span>
                </div>
                <div className="information-item__product-name">
                  <h5>Ngày sinh:</h5>
                  <span>
                    {new Date(user_birth).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <div className="information-item__product-name">
                  <h5>Giới tính:</h5>
                  <span>{user_gender}</span>
                </div>

                <div className="information-item__product-name">
                  <h5>Số điện thoại:</h5>
                  <span>{user_phone}</span>
                </div>

                <div className="information-item__product-name">
                  <h5>Địa chỉ:</h5>
                  <span>{user_address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
