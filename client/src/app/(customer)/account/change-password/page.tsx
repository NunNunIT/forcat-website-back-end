"use client";

// import libs
import React, { useEffect, useState, useRef } from "react";

import { BACKEND_URL } from "@/utils/commonConst";

// import css
import "./page.css";

export default function ChangePasswordPage() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const passwordInputRef = useRef(null);
  const oldPasswordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  useEffect(() => {
    const inputs = [
      passwordInputRef.current,
      oldPasswordInputRef.current,
      confirmPasswordInputRef.current,
    ];

    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => {
        inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
        if (inp.value !== "") return;
        inp.classList.remove("active");
      });
    });
  }, []);

  const togglePasswordVisibility = (setter, currentState) => {
    setter(!currentState);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateInput();
  };

  const validateInput = async () => {
    let isAllValid = true;
    let newErrors = { oldPassword: "", password: "", confirmPassword: "" };

    if (oldPassword === "") {
      newErrors.oldPassword = "Vui lòng nhập mật khẩu!";
      isAllValid = false;
    } else if (oldPassword.length < 8) {
      newErrors.oldPassword = "Mật khẩu phải ít nhất 8 ký tự!";
      isAllValid = false;
    }

    if (password === "") {
      newErrors.password = "Vui lòng nhập mật khẩu!";
      isAllValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải ít nhất 8 ký tự!";
      isAllValid = false;
    }

    if (confirmPassword === "") {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu!";
      isAllValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp!";
      isAllValid = false;
    }

    setErrors(newErrors);

    if (isAllValid) {
      const reset = {
        oldPassword: oldPassword,
        newPassword: password,
      };
      console.log("Preparing to call API");
      //  API call here
      try {
        const response = await fetch(`${BACKEND_URL}/user/change-password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reset),
          credentials: "include",
        });

        if (!response.ok) {
          console.log(`API call failed with status ${response.status}`);
          throw new Error("Error updating password");
        }

        console.log("API called successfully");

        const data = await response.json();

        if (data.message) {
          alert(data.message);
          window.location.href = "/account/information";
        } else {
          throw new Error("Error updating password");
        }
      } catch (error) {
        console.error("Error:", error);
      }

    }
  };

  return (
    <main className="account-information__main">
      <section className="change-pass__main" id="info">
        <div className="change-pass-item">
          <div className="change-pass-item--top">
            <div className="change-pass-item__info">
              <h4>Đổi mật khẩu</h4>
            </div>
          </div>
          <hr />

          <form
            id="form-change-pass"
            className="sign-in-form"
            method="post"
            onSubmit={handleSubmit}>
            <div className="change-pass-item__main">
              <div className="change-pass-item__element">
                <div className="change-pass-item__password"></div>
              </div>
              <div className="change_Password">
                <div className="reset__input-wrap">
                  <label>
                    Mật khẩu cũ<span className="red-start">*</span>
                  </label>
                  <span id="togglePassword" className="reset__toggle-password">
                    <input
                      ref={oldPasswordInputRef}
                      id="oldPassword"
                      type={isOldPasswordVisible ? "text" : "password"}
                      name="oldPassword"
                      className="reset__input-field"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <span
                      className="material-icons-outlined eye-open"
                      onClick={() =>
                        togglePasswordVisibility(
                          setOldPasswordVisible,
                          isOldPasswordVisible
                        )
                      }>
                      {isOldPasswordVisible ? "visibility_off" : "visibility"}
                    </span>
                  </span>
                  {errors.oldPassword && (
                    <div className="error">{errors.oldPassword}</div>
                  )}
                </div>

                <div className="reset__input-wrap">
                  <label>
                    Mật khẩu mới<span className="red-start">*</span>
                  </label>
                  <span
                    id="toggleoldPassword"
                    className="reset__toggle-password">
                    <input
                      ref={passwordInputRef}
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      className="reset__input-field"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() =>
                        togglePasswordVisibility(
                          setPasswordVisible,
                          isPasswordVisible
                        )
                      }
                      className="material-icons-outlined eye-open">
                      {isPasswordVisible ? "visibility_off" : "visibility"}
                    </span>
                  </span>

                  {errors.password && (
                    <div className="error">{errors.password}</div>
                  )}
                </div>

                <div className="reset__input-wrap">
                  <label>
                    Xác nhận mật khẩu mới<span className="red-start">*</span>
                  </label>
                  <span
                    id="toggleconfirmPassword"
                    className="reset__toggle-password">
                    <input
                      ref={confirmPasswordInputRef}
                      id="confirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      className="reset__input-field"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <span
                      className="material-icons-outlined eye-open"
                      onClick={() =>
                        togglePasswordVisibility(
                          setConfirmPasswordVisible,
                          isConfirmPasswordVisible
                        )
                      }>
                      {isConfirmPasswordVisible
                        ? "visibility_off"
                        : "visibility"}
                    </span>
                  </span>

                  {errors.confirmPassword && (
                    <div className="error">{errors.confirmPassword}</div>
                  )}
                </div>
                <div className="popup__button">
                  <button className="btn btn--filled pri save" type="submit">
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
