"use client";

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./search-heading--mobile.module.css";

const cx = classNames.bind(styles);

export default function SearchResultHeadingMobile() {
  const [currentActiveBtn, setCurrentActiveBtn] = useState(null);
  const [modals, setModals] = useState([]);

  useEffect(() => {
    const sortBtns = document.querySelectorAll(
      ".search-result__sort--disable__cover"
    );
    console.log(sortBtns);

    // Kiểm tra nếu có ít nhất một phần tử trong sortBtns
    if (sortBtns.length > 0) {
      const currentActiveBtn = sortBtns[0];
      currentActiveBtn.classList.add("active"); // Thêm lớp active cho phần tử đầu tiên

      sortBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Xóa lớp active khỏi phần tử hiện tại
          currentActiveBtn.classList.remove("active");
          // Thêm lớp active cho phần tử được click
          btn.classList.add("active");
          // Gán phần tử hiện tại là phần tử mới được click
          setCurrentActiveBtn(btn);
        });
      });
    }

    const modalBtn = document.getElementById("btn-filter");
    const modalNodes = document.querySelectorAll(".filter-popup__cover");
    const cancelBtn = document.getElementById("btn-filter-cancel");
    const modalArray = Array.from(modalNodes); // Chuyển đổi NodeList thành mảng
    setModals(modalArray);

    modalBtn.addEventListener("click", () => {
      modalArray.forEach((modal) => {
        modal.classList.add("show");
      });
    });

    cancelBtn.addEventListener("click", () => {
      modalArray.forEach((modal) => {
        modal.classList.remove("show");
      });
    });

    if (typeof window !== "undefined")
      window.addEventListener("click", (e) => {
        modalArray.forEach((modal) => {
          if (e.target === modal) {
            modal.classList.remove("show");
          }
        });
      });

    return () => {
      sortBtns.forEach((btn) => {
        btn.removeEventListener("click", () => {});
      });
      modalBtn.removeEventListener("click", () => {});
      cancelBtn.removeEventListener("click", () => {});
      if (typeof window !== "undefined")
        window.removeEventListener("click", () => {});
    };
  }, []);
  return (
    <div>
      <div className={cx("search-result__heading--disable")}>
        <p
          className={cx(
            "search-result__sort--disable",
            "search-result__sort--disable__cover"
          )}>
          Nổi bật
        </p>
        <p
          className={cx(
            "search-result__sort--disable",
            "search-result__sort--disable__cover"
          )}>
          Bán chạy
        </p>
        <p
          className={cx(
            "search-result__sort--disable",
            "search-result__sort--disable__cover"
          )}>
          Giá <span className={cx("material-icons-round")}>swap_vert</span>
        </p>
        <span className={cx("material-icons-round")} id="btn-filter">
          filter_alt
        </span>
      </div>
      <div className={cx("filter-popup", "filter-popup__cover")}>
        <form className={cx("filter-popup__main")}>
          <div className={cx("filter-popup__section")}>
            <label>
              <strong>Danh mục:</strong>
            </label>
            <div className={cx("filter-popup__section__main")}>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="type1"
                  value="type1"
                />
                <label htmlFor="type1" className={cx("filter-label")}>
                  Thực phẩm
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="type2"
                  value="type2"
                />
                <label htmlFor="type2" className={cx("filter-label")}>
                  Vệ sinh
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="type3"
                  value="type3"
                />
                <label htmlFor="type1" className={cx("filter-label")}>
                  Giấc ngủ
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="type4"
                  value="type4"
                />
                <label htmlFor="type4" className={cx("filter-label")}>
                  Đồ dùng, phụ kiện
                </label>
              </div>
            </div>
          </div>
          <hr />

          <div className={cx("filter-popup__section")}>
            <label>
              <strong>Giá tiền:</strong>
            </label>
            <div className={cx("filter-popup__section__main")}>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="price1"
                  value="price1"
                />
                <label htmlFor="price1" className={cx("filter-label")}>
                  Dưới 100.000đ
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="price2"
                  value="price2"
                />
                <label htmlFor="price2" className={cx("filter-label")}>
                  100.000 - 500.000đ
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="price3"
                  value="price3"
                />
                <label htmlFor="price3" className={cx("filter-label")}>
                  Trên 500.000đ
                </label>
              </div>
            </div>
          </div>
          <hr />

          <div className={cx("filter-popup__section")}>
            <label>
              <strong>Đánh giá:</strong>
            </label>
            <div className={cx("filter-popup__section__main")}>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="rate1"
                  value="rate1"
                />
                <label htmlFor="rate1" className={cx("filter-label")}>
                  <div className={cx("filter-label__rate")}>
                    <span className="material-icons-round">star</span>
                  </div>
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="rate2"
                  value="rate2"
                />
                <label htmlFor="rate2" className={cx("filter-label")}>
                  <div className={cx("filter-label__rate")}>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                  </div>
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="rate3"
                  value="rate3"
                />
                <label htmlFor="rate3" className={cx("filter-label")}>
                  <div className={cx("filter-label__rate")}>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                  </div>
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="rate4"
                  value="rate4"
                />
                <label htmlFor="rate4" className={cx("filter-label")}>
                  <div className={cx("filter-label__rate")}>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                  </div>
                </label>
              </div>
              <div className={cx("filter-popup-options")}>
                <input
                  className={cx("filter-option")}
                  type="radio"
                  id="rate5"
                  value="rate5"
                />
                <label htmlFor="rate5" className={cx("filter-label")}>
                  <div className={cx("filter-label__rate")}>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                    <span className="material-icons-round">star</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className={cx("filter-popup__btn")}>
            <button
              className={cx("btn btn--outlined pri")}
              id="btn-filter-cancel">
              Xóa bộ lọc
            </button>
            <button className={cx("btn btn--filled pri")} type="submit">
              Áp dụng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
