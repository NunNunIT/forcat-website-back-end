"use client";
// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";

// import utils
import { isValidEmail } from "@/utils/index";
import { BACKEND_URL } from "@/utils/commonConst";

// import components
import OAuth from "../oAuth";

// import css
import styles from "../authForm.module.css";

const cx = classNames.bind(styles);

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const initialForms = {
    user_email: "",
    user_password: "",
  };

  const [formData, setFormData] = useState(initialForms);
  const [errors, setErrors] = useState(initialForms);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initialForms);

    // Check for validation
    let isValid = true;
    const newErrors = { ...initialForms };

    if (!formData.user_email) {
      newErrors.user_email = "Email không được bỏ trống!";
      isValid = false;
    } else if (!isValidEmail(formData.user_email)) {
      newErrors.user_email = "Email không đúng định dạng!";
      isValid = false;
    }

    if (!formData.user_password) {
      newErrors.user_password = "Mật khẩu không được bỏ trống!";
      isValid = false;
    } else if (formData.user_password.length < 8) {
      newErrors.user_password = "Độ dài mật khẩu phải trên 8 ký tự!";
      isValid = false;
    }

    // Update state with errors
    setErrors(newErrors);

    if (isValid) {
      try {
        setLoading(true);
        setErrors(initialForms);
        ("use server");
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Assuming formData is an object
        });
        let data = await res.json();
        setLoading(false);
        let accessTokens = await Cookies.get("accessToken");
        console.log("Trước khi Set: ", accessTokens);

        // console.log("login success: ", data.message);
        Cookies.set("accessToken", data.token);
        console.log("User", data.data)
        Cookies.set("currentUser", data.data._id);
        localStorage.setItem("currentUser", JSON.stringify(data.data));

        accessTokens = await Cookies.get("accessToken");
        console.log("Sau khi set: ", accessTokens);

        window.location.href = "/";

        if (data.status == 404) {
          newErrors.user_email = "Tài khoản không tồn tại!";
          setErrors(newErrors);
          return;
        }

        if (data.status == 401) {
          newErrors.user_email = "Email không chính xác!";
          newErrors.user_password = "Mật khẩu không chính xác!";
          setErrors(newErrors);
          return;
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <form className={cx("form-auth")} onSubmit={handleSubmit}>
      <div className={cx("form-auth__title")}>
        <h1>Chào mừng bạn quay trở lại!</h1>
        <Link href="/register">
          <h3>
            Chưa có tài khoản? <b>Đăng ký ngay</b>{" "}
          </h3>
        </Link>
      </div>

      <div className={cx("form-auth__input-content")}>
        <label htmlFor="email">
          Email<span className={cx("red-start")}> *</span>
        </label>
        <div className={cx("input-container")}>
          <input
            className={cx("input-field")}
            type="text"
            placeholder="Nhập email "
            name="user_email"
            id="user_email"
            onChange={handleChange}
          />
        </div>
        {errors.user_email && (
          <p className={cx("text-error", "form-error")}>{errors.user_email}</p>
        )}
      </div>

      <div className={cx("form-auth__input-content")}>
        <label htmlFor="password">
          Mật khẩu<span className={cx("red-start")}> *</span>
        </label>
        <div className={cx("input-container")}>
          <input
            className={cx("input-field")}
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            name="user_password"
            id="user_password"
            onChange={handleChange}
          />
          <span
            className={cx("material-icons-outlined eye-open", "icon")}
            onClick={handleTogglePasswordVisibility}>
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </div>
        {errors.user_password && (
          <p className={cx("text-error", "form-error")}>
            {errors.user_password}
          </p>
        )}
      </div>
      <Link href="/forgot" className={cx("align-right")}>
          <p>
            Quên mật khẩu?
          </p>
      </Link>
      <button disabled={loading} className={cx("form-button")}>
        <h3>{loading ? "Đang xử lý..." : "Đăng nhập"}</h3>
      </button>
      <OAuth />
    </form>
  );
};

export default LoginForm;
