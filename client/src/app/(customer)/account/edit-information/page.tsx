"use client";

// import libs
import React, { useRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

// import components
import Link from "next/link";
import { convertDateFormatYMD } from "@/utils";

// import css
import "./page.css";
import "react-datepicker/dist/react-datepicker.css";

export default function EditInformationPage() {
  const [initialUserBirth, setInitialUserBirth] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const displayUserBirthRef = useRef<HTMLSpanElement>(null);
  const userBirthInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPhoneRef = useRef<HTMLInputElement>(null);
  const userAddressRef = useRef<HTMLInputElement>(null);

  const validateInputData = async () => {
    // Validate input and send update request
    // This is a placeholder function, replace with your actual validation and request sending logic
    return fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userNameRef.current?.value,
        userEmail: userEmailRef.current?.value,
        userPhone: userPhoneRef.current?.value,
        userAddress: userAddressRef.current?.value,
      }),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateInput()
      .then((response) => {
        if (response && response.ok) {
          // Redirect to /account/information if the update is successful
          if (typeof window !== "undefined")
            window.location.href = "/account/information";
        } else {
          console.error("Update failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const setError = (element: HTMLElement, message: string) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl?.querySelector(
      ".error-message"
    ) as HTMLElement;

    if (errorDisplay) {
      errorDisplay.innerText = message;
    }

    if (inputControl) {
      inputControl.classList.add("error");
      inputControl.classList.remove("error");
    }
  };

  const setSuccess = (element: HTMLElement) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl?.querySelector(
      ".error-message"
    ) as HTMLElement;

    if (errorDisplay) {
      errorDisplay.innerText = "";
    }

    if (inputControl) {
      inputControl.classList.add("success");
      inputControl.classList.remove("error");
    }
  };

  const isValidUserName = (userName: string): boolean => {
    const re =
      /^[a-zA-Z\sàáạảãăắằẵặẳâầấậẩẫđèéẹẻẽêềếệểễòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữìíịỉĩỳýỵỷỹ]+$/;
    return re.test(String(userName).trim());
  };

  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    const re = /^[0-9]{10}$/;
    return re.test(String(phoneNumber).trim());
  };

  const isValidEmail = (email: string): boolean => {
    if (!email) {
      return true;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInput = (): Promise<Response | null> => {
    return new Promise(async (resolve, reject) => {
      const userNameValue = userNameRef.current?.value.trim();
      const userEmailValue = userEmailRef.current?.value.trim();
      const userPhoneValue = userPhoneRef.current?.value.trim();

      let isAllValid = true;

      if (userNameValue === "") {
        setError(userNameRef.current as HTMLElement, "Vui lòng nhập họ tên!");
        isAllValid = false;
      } else if (!isValidUserName(userNameValue)) {
        setError(
          userNameRef.current as HTMLElement,
          "Họ tên không đúng định dạng!"
        );
        isAllValid = false;
      } else {
        setSuccess(userNameRef.current as HTMLElement);
      }

      if (!isValidEmail(userEmailValue)) {
        setError(
          userEmailRef.current as HTMLElement,
          "Email không đúng định dạng!"
        );
        isAllValid = false;
      } else {
        setSuccess(userEmailRef.current as HTMLElement);
      }

      if (userPhoneValue === "") {
        setError(
          userPhoneRef.current as HTMLElement,
          "Vui lòng nhập số điện thoại!"
        );
        isAllValid = false;
      } else if (!isValidPhoneNumber(userPhoneValue)) {
        setError(
          userPhoneRef.current as HTMLElement,
          "Số điện thoại không đúng định dạng!"
        );
        isAllValid = false;
      } else {
        setSuccess(userPhoneRef.current as HTMLElement);
      }

      if (isAllValid) {
        try {
          const response = await validateInputData();
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }
    });
  };

  const userName = React.useRef<HTMLInputElement>(null);
  const userBirth = React.useRef<HTMLInputElement>(null);
  const userSex = React.useRef<HTMLInputElement>(null);
  const userEmail = React.useRef<HTMLInputElement>(null);
  const userPhone = React.useRef<HTMLInputElement>(null);
  const userAddress = React.useRef<HTMLInputElement>(null);

  const sendUpdateRequest = async (): Promise<Response> => {
    const userNameValue: string = userName.current?.value.trim() || "";
    const userBirthValue: string = userBirth.current?.value.trim() || "";
    const userSexValue: string = userSex.current?.value.trim() || "";
    const userEmailValue: string = userEmail.current?.value.trim() || "";
    const userPhoneValue: string = userPhone.current?.value.trim() || "";
    const userAddressValue: string = userAddress.current?.value.trim() || "";

    const requestBody = {
      user_name: userNameValue,
      user_birth: userBirthValue,
      user_sex: userSexValue,
      user_email: userEmailValue,
      user_phone: userPhoneValue,
      user_address: userAddressValue,
    };

    try {
      const response: Response = await fetch("/account/edit-information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      return response;
    } catch (error: any) {
      console.error("Error sending update request:", error);
    }
  };

  useEffect(() => {
    const userBirthDiv = document.querySelector(".userBirth");

    // Lưu trữ giá trị ban đầu của ngày sinh
    const displayUserBirth = document.getElementById("displayUserBirth");
    if (displayUserBirth) {
      setInitialUserBirth(displayUserBirth.textContent || "");
    }

    let userBirthInput = document.getElementById(
      "userBirth"
    ) as HTMLInputElement;

    // Kiểm tra nếu initialUserBirth có giá trị thì mới đặt giá trị cho userBirthInput
    if (initialUserBirth) {
      userBirthInput.value = convertDateFormatYMD(initialUserBirth);
    }
  }, [initialUserBirth]); // Thêm initialUserBirth vào mảng dependency

  return (
    <main className="account-information__main">
      <section className="information__main">
        <div className="information-item">
          <div className="information-item--top">
            <div className="information-item__info">
              <h3>Thông tin cá nhân</h3>
            </div>
          </div>
          <form
            id="editForm"
            action="/account/edit-information"
            method="POST"
            onSubmit={handleSubmit}
            ref={formRef}>
            <div className="information-item__main">
              <div className="information-item__element">
                <div className="information-item__product-detail">
                  <div className="information-item__product-name">
                    <label htmlFor="userName">
                      Tên người dùng:
                      <span className="red-start">*</span>
                    </label>
                    <div className="userName">
                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        autoComplete="off"
                        placeholder="Nhập tên"
                        ref={userNameRef}
                      />
                      <div className="error-message"></div>
                    </div>
                  </div>

                  <div className="information-item__product-name">
                    <label htmlFor="userBirth">Ngày sinh:</label>
                    <div className="userBirth">
                      <span id="displayUserBirth" ref={displayUserBirthRef}>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/yyyy"
                        />
                      </span>
                      <div className="error-message"></div>
                    </div>
                  </div>

                  <div className="information-item__product-name">
                    <label htmlFor="userSex">Giới tính:</label>
                    <div className="userSex">
                      <select
                        className="localSelect"
                        id="userSex"
                        name="userSex"
                        title="Chọn giới tính">
                        <option value="Nữ">Nữ</option>
                        <option value="Nam">Nam</option>
                      </select>
                    </div>
                  </div>

                  <div className="information-item__product-name">
                    <label htmlFor="userEmail">Email:</label>
                    <div className="userEmail">
                      <input
                        type="text"
                        id="userEmail"
                        name="userEmail"
                        autoComplete="off"
                        placeholder="Nhập email"
                        ref={userEmailRef}
                      />
                      <div className="error-message"></div>
                    </div>
                  </div>

                  <div className="information-item__product-name">
                    <label htmlFor="userPhone">
                      Số điện thoại:
                      <span className="red-start">*</span>
                    </label>
                    <div className="userPhone">
                      <input
                        type="text"
                        id="userPhone"
                        name="userPhone"
                        autoComplete="off"
                        placeholder="Nhập số điện thoại"
                        ref={userPhoneRef}
                      />
                      <div className="error-message"></div>
                    </div>
                  </div>

                  <div className="information-item__product-name">
                    <label htmlFor="userAddress">Địa chỉ:</label>
                    <div className="userAddress">
                      <input
                        type="text"
                        id="userAddress"
                        name="userAddress"
                        autoComplete="off"
                        placeholder="Nhập địa chỉ"
                        ref={userAddressRef}
                      />
                      <div className="error-message"></div>
                    </div>
                  </div>

                  <div className="popup__button">
                    <Link
                      href="/account/information"
                      className="btn btn--outlined pri btn-cancel-edit">
                      Hủy
                    </Link>
                    <button
                      type="submit"
                      id="saveButton"
                      className="btn btn--filled pri btn-save">
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
