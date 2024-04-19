"use client";

// import libs
import { notFound } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import axios from "axios";

// import components
import { OrderProduct } from "./components";

// import utils
import { convertNumberToMoney } from "@/utils";

// import css
import "./page.css";

const buyInfo = store.getState().cart.buyItems;
const totalWithDiscount = buyInfo.reduce((result, item) => {
  return (
    result +
    item.unit_price * ((100 - item.discount_amount) / 100) * item.quantity
  );
}, 0);
const totalWithoutDiscount = buyInfo.reduce((result, item) => {
  return result + item.unit_price * item.quantity;
}, 0);

export default function SearchResultPage() {
  useEffect(() => {
    if (buyInfo.length == 0) return notFound();
  }, []);

  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(true);
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  // Kiểm tra định dạng họ và tên
  function validateName(event: React.ChangeEvent<HTMLInputElement>) {
    const vietnameseRegex =
      /^[a-zA-ZđĐáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ\s]*$/g;
    const nameInput = event.currentTarget as HTMLInputElement;
    const errorSpan = nameInput.nextElementSibling as HTMLSpanElement;

    if (!vietnameseRegex.test(nameInput.value)) {
      errorSpan.textContent =
        "Họ và tên chỉ bao gồm chữ hoa, chữ thường và dấu cách!";
      errorSpan.style.display = "block";
      setIsNameValid(false);
    } else {
      errorSpan.style.display = "none";
      setIsNameValid(true);
    }

    if (nameInput.value === "") {
      errorSpan.textContent = "Vui lòng điền họ và tên người nhận hàng!";
      errorSpan.style.display = "block";
    }
  }

  // Kiểm tra định dạng số điện thoại Việt Nam
  function validatePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    const vnPhoneNumberRegex =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    const phoneNumberInput = event.currentTarget as HTMLInputElement;
    const errorSpan = phoneNumberInput.nextElementSibling as HTMLSpanElement;

    if (!vnPhoneNumberRegex.test(phoneNumberInput.value)) {
      errorSpan.textContent = "Số điện thoại không hợp lệ!";
      errorSpan.style.display = "block";
      setIsPhoneNumberValid(false);
    } else {
      errorSpan.style.display = "none";
      setIsPhoneNumberValid(true);
    }

    if (phoneNumberInput.value === "") {
      errorSpan.style.display = "block";
      errorSpan.textContent = "Vui lòng điền số điện thoại người nhận hàng!";
    }
  }

  useEffect(() => {
    // Fetch data
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        // console.error("Error fetching data: ", error);
      });
  }, []);

  function handleCityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCityId = event.target.value;
    const selectedCity = cities.find((city) => city.Id === selectedCityId);

    if (selectedCity) {
      setDistricts(selectedCity.Districts);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  }

  function handleDistrictChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedDistrictId = event.target.value;
    const selectedDistrict = districts.find(
      (district) => district.Id === selectedDistrictId
    );

    if (selectedDistrict) {
      setWards(selectedDistrict.Wards);
    } else {
      setWards([]);
    }
  }

  return (
    // <main className="order-container">
    <Provider store={store}>
      <form id="order-form">
        {/* onSubmit={submitOrderForm} */}
        <section className="order-detail">
          <div className="order-detail__customer">
            <h2>Thông tin người nhận hàng</h2>
            <div>
              <div className="order-detail__input">
                <input
                  name="buyerName"
                  // value="Họ và tên mặc định"
                  onChange={validateName}
                  type="text"
                  placeholder="Họ và tên"
                  required
                />
                <p className="error"></p>
              </div>
              <div className="order-detail__input">
                <input
                  name="buyerPhone"
                  // value="Số điện thoại mặc định"
                  onChange={validatePhoneNumber}
                  type="text"
                  placeholder="Số điện thoại"
                  required
                />
                <p className="error"></p>
              </div>
            </div>
          </div>

          <div className="order-detail__location location">
            <h2>Địa chỉ nhận hàng</h2>
            <div className="location__input-group">
              <select
                className="location__select"
                id="city"
                required
                onChange={handleCityChange}>
                <option value="" selected>
                  Chọn Tỉnh/Thành phố
                </option>
                {cities.map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>

              <select
                className="location__select"
                id="district"
                required
                onChange={handleDistrictChange}>
                <option value="" selected>
                  Chọn Quận/Huyện
                </option>
                {districts.map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>

              <select className="location__select" id="ward" required>
                <option value="" selected>
                  Chọn Phường/Xã
                </option>
                {wards.map((ward) => (
                  <option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </option>
                ))}
              </select>

              <input
                name="address"
                type="text"
                placeholder="Số nhà, tên đường..."
                required
              />
            </div>
          </div>

          <div className="order-detail__note note">
            <h2>Yêu cầu kèm theo</h2>
            <textarea
              className="note__text-area"
              name="note"
              placeholder="Hãy nhập yêu cầu kèm theo (tùy chọn)..."></textarea>
          </div>

          <div className="order-detail__pay-method pay-method">
            <h2>Phương thức thanh toán</h2>
            <div className="pay-method__choose">
              <div>
                <input
                  type="radio"
                  id="radio1"
                  name="pay-method"
                  value="1"
                  required
                />
                <label htmlFor="radio1">
                  Thanh toán trực tiếp khi nhận hàng
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="radio2"
                  name="pay-method"
                  value="2"
                  required
                />
                <label htmlFor="radio2">Thanh toán qua MOMO</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="radio3"
                  name="pay-method"
                  value="3"
                  required
                />
                <label htmlFor="radio3">Thanh toán qua Internet Banking</label>
              </div>
            </div>
          </div>
        </section>
      </form>

      <section className="order-sidebar">
        <div className="order-sidebar__product">
          {buyInfo.map((item, index) => {
            return <OrderProduct buyInfo={item} key={index} />;
          })}
        </div>
        <div className="order-pay__coupon">
          <input
            name="address"
            type="text"
            placeholder="Mã khuyến mãi"
            required
          />
          <div id="order-pay__coupon-submit">Sử dụng</div>
        </div>
        <hr />
        <div className="order-pay">
          <div className="order-pay__price">
            <div className="order-pay__price-container">
              <div>
                {totalWithDiscount != totalWithoutDiscount && (
                  <del className="order-pay__total-del">
                    {convertNumberToMoney(totalWithoutDiscount)}
                  </del>
                )}
              </div>
              <div className="order-pay__price__main">
                <p>Tổng tiền hàng</p>
                <p className="order-pay__total">
                  {convertNumberToMoney(totalWithDiscount)}
                </p>
              </div>
            </div>
          </div>

          <div className="order-pay__submit">
            <p>
              Nhấn &quot;Đặt hàng&quot; đồng nghĩa với việc bạn đồng ý tuân theo
              <Link href="/privacy-policy">
                {" "}
                Điều khoản đặt hàng của Forcat.
              </Link>
            </p>
            <button id="order-form-submit" type="submit" form="order-form">
              Đặt hàng
            </button>
          </div>
        </div>
      </section>
    </Provider>
    // </main>
  );
}
