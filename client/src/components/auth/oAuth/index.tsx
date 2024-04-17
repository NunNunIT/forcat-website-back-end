// import libs
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import Image from "next/image";
import React from "react";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import styles from "../authForm.module.css";

import { app } from "./firebase";

const cx = classNames.bind(styles);

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const res = await fetch(BACKEND_URL + "/auth/login/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: result.user.displayName,
          user_email: result.user.email,
          user_avt_img: result.user.photoURL,
        }),
      });

      const data = await res.json();

      // console.log("login success: ", data.message);
      Cookies.set("accessToken", data.token);
      Cookies.set("currentUser", data.data._id);
      localStorage.setItem("currentUser", JSON.stringify(data.data));

      window.location.href = "/";
    } catch (error) {
      // console.log("Could not login with Google", error);
    }
  };

  return (
    <div className={cx("form-auth__social-media")}>
      <p> Hoặc đăng ký bằng</p>
      <div className={cx("form-auth__social-buttons")}>
        <button
          type="button"
          onClick={handleGoogleClick}
          className={cx("social-image")}>
          <Image src="/imgs/social_media/google-icon.jpg" alt="Google" fill />
        </button>

        <button type="button" className={cx("social-image")}>
          <Image
            src="/imgs/social_media//facebook-icon.svg"
            alt="Facebook"
            fill
          />
        </button>
      </div>
    </div>
  );
}
