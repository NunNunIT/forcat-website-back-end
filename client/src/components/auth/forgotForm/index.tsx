"use client";

// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";

// import utils
import { isValidEmail } from "@/utils/index";
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import styles from "../authForm.module.css";
import { set } from "mongoose";

const cx = classNames.bind(styles);

const ForgotForm = () => {
  const initialForms = {
    user_email: "",
    user_password: "",
    user_confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialForms);
  const [errors, setErrors] = useState(initialForms);
  const [error, setError] = useState(false);
  const [errorOTP, setErrorOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentForm, setCurrentForm] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //xử lý form 1
  const handleStep1 = async (e) => {
    e.preventDefault();

    let isValid = true;
    let newErrors = { ...initialForms };

    // Validate email
    if (!formData.user_email) {
      newErrors.user_email = "Email không được bỏ trống!";
      isValid = false;
    } else if (!isValidEmail(formData.user_email)) {
      newErrors.user_email = "Email không đúng định dạng!";
      isValid = false;
    }

    // Update state with errors
    setErrors(newErrors);

    if (isValid) {
      try {
        setLoading(true);
        setErrors(initialForms);
        const res = await fetch(BACKEND_URL + "/auth/forgot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Assuming formData is an object
          credentials: "include",
        });
        const data = await res.json();
        setLoading(false);

        if (data.status == 404) {
          newErrors.user_email = "Email này chưa đăng ký tài khoản!";
          setErrors(newErrors);
          return;
        } 
        setCurrentForm(currentForm + 1);
        setStartCountdown(true);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
  };

  //xử lý form 2

  const [count, setCount] = useState(60);
  const [startCountdown, setStartCountdown] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showResendMessage, setShowResendMessage] = useState(false);
  const [otp, setOtp] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    const keyCode = event.nativeEvent.keyCode;

    // Check if the user pressed the backspace key
    if (keyCode === 8) {
        // Remove the last character from the OTP
        setOtp(otp.slice(0, -1));
    } else {
        // Only allow number input
        if (!value.match(/^[0-9]$/)) {
            event.target.value = "";
        } else {
            // Check if otp length is less than 6 before adding new value
            if (otp.length < 6) {
                setOtp(otp + value);
            }
        }
    }
};
  const moveToNext = (currentInput, nextInputId, prevInputId) => {
    if (currentInput.value.length >= 1) {
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (currentInput.value.length === 0 && prevInputId) {
      const prevInput = document.getElementById(prevInputId);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  useEffect(() => {
    if (!startCountdown) return;
    if (count === 0) {
      return;
    }
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count, startCountdown]);

  const handleResendOTP = async (event) => {
    event.preventDefault();

    setIsResending(true);
    setShowResendMessage(true);

    setTimeout(() => {
      setIsResending(false);
      setShowResendMessage(false);
    }, 3000); // After 3 seconds, show the resend link again
    setCount(60);

    if (!isResending) {
      try {
        setLoading(true);
        const res = await fetch(BACKEND_URL + "/auth/forgot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });
        setLoading(false);
      } catch (error) {
        setIsResending(false);
        setShowResendMessage(false);
      }
    }
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    let isValid = true;
    let newErrorOtp = "";

    if (otp === "") {
      newErrorOtp = "Vui lòng nhập mã OTP!";
      isValid = false;
    }
    setErrorOTP(newErrorOtp);

        
    if (isValid) {
      try {
        setLoading(true);
        setErrorOTP(newErrorOtp);
        const requestBody = {
          user_email: formData.user_email,
          otp: otp,
        };
        console.log("Request body: ", requestBody);
        const res = await fetch(BACKEND_URL + "/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_email: formData.user_email,
            otp: otp,
          }),
          credentials: "include",
        });

        const data = await res.json();
        setLoading(false);

        if (data.status == 400) {
          setOtp("");
          newErrorOtp = "Mã OTP không trùng khớp!";
          setErrorOTP(newErrorOtp);
          console.log(errorOTP);
          return;
        }
        setCurrentForm(currentForm + 1);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log("OTP verification failed");
      }
    }

    
  };

  //xử lý form 3

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initialForms);

    // Check for validation
    let isValid = true;
    const newErrors = { ...initialForms };

    if (!formData.user_password) {
      newErrors.user_password = "Mật khẩu không được bỏ trống!";
      isValid = false;
    } else if (formData.user_password.length < 8) {
      newErrors.user_password = "Độ dài mật khẩu phải trên 8 ký tự!";
      isValid = false;
    }

    if (!formData.user_confirmPassword) {
      newErrors.user_confirmPassword = "Xác nhận mật khẩu không được bỏ trống!";
      isValid = false;
    } else if (formData.user_confirmPassword.length < 8) {
      newErrors.user_confirmPassword = "Độ dài mật khẩu phải trên 8 ký tự!";
      isValid = false;
    }

    if (
      formData.user_password &&
      formData.user_confirmPassword &&
      formData.user_confirmPassword != formData.user_password
    ) {
      newErrors.user_confirmPassword = "Mật khẩu không trùng khớp!";
      newErrors.user_password = "Mật khẩu không trùng khớp!";
      isValid = false;
    }

    // Update state with errors
    setErrors(newErrors);
    if (isValid) {
      try {
        setLoading(true);
        setErrors(initialForms);
        const res = await fetch(BACKEND_URL + "/auth/reset-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: formData.user_password,
            user_email: formData.user_email,
          }), // Assuming formData is an object
        });
        const data = await res.json();
        setLoading(false);
       
        alert("Đặt lại mật khẩu thành công!");
        window.location.href = "/login";
        // If no errors, move to homepage
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <div>
      {currentForm === 1 && (
        <form className={cx("form-auth")} onSubmit={handleStep1}>
          <div className={cx("form-auth__title")}>
            <h2>Đặt lại mật khẩu</h2>
          </div>

          <div className={cx("form-auth__input-content")}>
            <label htmlFor="email">
              Email<span className={cx("red-start")}> *</span>
            </label>
            <input
              type="text"
              placeholder="Nhập email "
              name="user_email"
              id="user_email"
              onChange={handleChange}
            />
            {errors.user_email && (
              <p className={cx("text-error", "form-error")}>
                {errors.user_email}
              </p>
            )}
          </div>
          <div className={cx("form-confirm")}>
            <button disabled={loading} className={cx("form-button")}>
              <h3>{loading ? "Đang xử lý..." : "Xác nhận"}</h3>
            </button>
            <Link href="/login">
              <h3>Trở lại</h3>
            </Link>
          </div>
        </form>
      )}
      {currentForm === 2 && (
        <form className={cx("form-auth")} onSubmit={handleStep2}>
          <div className={cx("form-auth__title")}>
            <h2>Nhập mã OTP</h2>
          </div>
          <div className={cx("heading")}>
            <h5>Mã OTP đã được gửi đến thiết bị của bạn</h5>
          </div>
          <div className={cx("timer")}>
            {count === 0 ? "Hết thời gian xác nhận!" : count}
          </div>

          <div className={cx("input-wrap")}>
            <input
              type="text"
              name="otp"
              id="otp1"
              maxLength={1}
              onInput={(event) => {
                handleInputChange(event);
                moveToNext(document.getElementById("otp1"), "otp2", "");
              }}
            />
            <input
              type="text"
              name="otp"
              id="otp2"
              maxLength={1}
              onInput={(event) => {
                handleInputChange(event);
                moveToNext(document.getElementById("otp2"), "otp3", "otp1");
              }}
            />
            <input
              type="text"
              name="otp"
              id="otp3"
              maxLength={1}
              onInput={(event) => {
                handleInputChange(event);
                moveToNext(document.getElementById("otp3"), "otp4", "otp2");
              }}
            />
            <input
              type="text"
              name="otp"
              id="otp4"
              maxLength={1}
              onInput={(event) => {
                handleInputChange(event);
                moveToNext(document.getElementById("otp4"), "otp5", "otp3");
              }}
            />
            <input
              type="text"
              name="otp"
              id="otp5"
              maxLength={1}
              onInput={(event) => {
                handleInputChange(event);
                moveToNext(document.getElementById("otp5"), "otp6", "otp4");
              }}
            />

            <input
              type="text"
              name="otp"
              id="otp6"
              maxLength={1}
              onInput={(event) => {
                handleInputChange(event);
                moveToNext(document.getElementById("otp6"), "", "otp5");
              }}
            />
          </div>

          {!isResending && !showResendMessage && (
            <div className={cx("send-again")}>
              <span>Bạn không nhận được mã OTP?</span>
              <Link href="#" id="resendLink" onClick={handleResendOTP}>
                <strong>
                  <u> Gửi lại mã OTP</u>
                </strong>
              </Link>
            </div>
          )}
          {showResendMessage && (
            <div className={cx("resend")}>Đã gửi lại mã OTP</div>
          )}
          {errorOTP && (
            <p className={cx("text-error", "otp-error")}>{errorOTP}</p>
          )}

          <div className={cx("form-confirm")}>
            <button disabled={loading} className={cx("form-button")}>
              <h3>{loading ? "Đang xử lý..." : "Xác nhận"}</h3>
            </button>
            <Link href="/login">
              <h3>Hủy</h3>
            </Link>
          </div>
        </form>
      )}
      {currentForm === 3 && (
        <form className={cx("form-auth")} onSubmit={handleSubmit}>
          <div className={cx("form-auth__title")}>
            <h2>Đặt lại mật khẩu</h2>
          </div>
          <div className={cx("form-auth__input-content")}>
            <label htmlFor="password">
              Mật khẩu mới<span className={cx("red-start")}> *</span>
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
                onClick={handleTogglePassword}>
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
            {errors.user_password && (
              <p className={cx("text-error", "form-error")}>
                {errors.user_password}
              </p>
            )}
          </div>
          <div className={cx("form-auth__input-content")}>
            <label htmlFor="password">
              Xác nhận mật khẩu mới<span className={cx("red-start")}> *</span>
            </label>
            <div className={cx("input-container")}>
              <input
                className={cx("input-field")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                name="user_confirmPassword"
                id="user_confirmPassword"
                onChange={handleChange}
              />
              <span
                className={cx("material-icons-outlined eye-open", "icon")}
                onClick={handleToggleConfirmPassword}>
                {showConfirmPassword ? "visibility_off" : "visibility"}
              </span>
            </div>

            {errors.user_password && (
              <p className={cx("text-error", "form-error")}>
                {errors.user_confirmPassword}
              </p>
            )}
          </div>
          <div className={cx("form-confirm")}>
            <button disabled={loading} className={cx("form-button")}>
              <h3>{loading ? "Đang xử lý..." : "Xác nhận"}</h3>
            </button>
            <Link href="/login">
              <h3>Hủy</h3>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotForm;
