"use client";

// import libs
import classNames from "classnames/bind";
import { useState, useEffect } from "react";

// import css
import styles from "./search-filter.module.css";

// use css
const cx = classNames.bind(styles);

export default function SearchResultFilter() {
  const [selectedFilterItem, setSelectedFilterItem] =
    useState<HTMLDivElement | null>(null);

  const handleFilterItemClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isFilterItem = target.closest(
      ".search-result__filter-normal__content_cover"
    );
    const isDropdownContent = target.closest(".dropdown-content__cover");

    // Nếu phần tử được bấm là một mục filter
    if (isFilterItem) {
      const filterItem = isFilterItem as HTMLDivElement;

      // Đặt lại tất cả các mục filter khác
      const filterItems = document.querySelectorAll(
        ".search-result__filter-normal__content_cover"
      );
      filterItems.forEach((item: Element) => {
        if (item !== filterItem) {
          (item as HTMLElement).style.borderColor = ""; // Đặt lại màu viền
          const dropdownContent = item.querySelector(
            ".dropdown-content__cover"
          ) as HTMLDivElement | null;
          if (dropdownContent) {
            dropdownContent.style.display = "none"; // Ẩn dropdown content
          }
        }
      });

      // Hiển thị hoặc ẩn dropdown content cho mục filter được bấm
      if (filterItem.style.borderColor === "brown") {
        filterItem.style.borderColor = ""; // Đặt lại màu viền
        const dropdownContent = filterItem.querySelector(
          ".dropdown-content__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "none"; // Ẩn dropdown content
        }
      } else {
        filterItem.style.borderColor = "brown"; // Đặt màu viền là nâu
        const dropdownContent = filterItem.querySelector(
          ".dropdown-content__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "flex"; // Hiển thị dropdown content
        }
      }

      setSelectedFilterItem(filterItem);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);

    // Clean up: Gỡ bỏ sự kiện khi component unmount
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleBodyClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isFilterItem = target.closest(
      ".search-result__filter-normal__content_cover"
    );

    if (!isFilterItem) {
      document
        .querySelectorAll(".search-result__filter-normal__content_cover")
        .forEach((item: Element) => {
          (item as HTMLElement).style.borderColor = ""; // Reset border color
          const dropdownContent = item.querySelector(
            ".dropdown-content__cover"
          ) as HTMLDivElement | null;
          if (dropdownContent) {
            dropdownContent.style.display = "none"; // Hide dropdown content
          }
        });

      setSelectedFilterItem(null);
    }
  };

  return (
    <div>
      <section className={cx("search-result__filter")}>
        <div className={cx("search-result__filter-normal")}>
          <h5 className={cx("search-result__filter-normal__title")}>Bộ lọc:</h5>
            <div
              className={cx(
                "search-result__filter-normal__content",
                "search-result__filter-normal__content_cover"
              )}
              onClick={(e: any) => handleFilterItemClick(e)}>
              <p>Danh mục</p>
              <span className={cx("material-icons-round dropdown-button")}>
                expand_more
              </span>
              <div
                className={cx("dropdown-content", "dropdown-content__cover")}>
                <div className={cx("filter-list")}>
                  <div className={cx("dropdown-options")}>
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
                  <div className={cx("dropdown-options")}>
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
                  <div className={cx("dropdown-options")}>
                    <input
                      className={cx("filter-option")}
                      type="radio"
                      id="type3"
                      value="type3"
                    />
                    <label htmlFor="type3" className={cx("filter-label")}>
                      Giấc ngủ
                    </label>
                  </div>
                  <div className={cx("dropdown-options")}>
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
                <div className={cx("filter-dropdown__button")}>
                  <button className={cx("btn btn--outlined")} type="submit">
                    Hủy bộ lọc này
                  </button>
                  <button className={cx("btn btn--filled")} type="submit">
                    Xem <strong>13</strong> sản phẩm
                  </button>
                </div>
              </div>
            </div>

            <div
              className={cx(
                "search-result__filter-normal__content",
                "search-result__filter-normal__content_cover"
              )}
              onClick={(e: any) => handleFilterItemClick(e)}>
              <p>Giá tiền</p>
              <span className={cx("material-icons-round dropdown-button")}>
                expand_more
              </span>
              <div
                className={cx("dropdown-content", "dropdown-content__cover")}>
                <div className={cx("filter-list")}>
                  <div className={cx("dropdown-options")}>
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
                  <div className={cx("dropdown-options")}>
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
                  <div className={cx("dropdown-options")}>
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
                <div className={cx("filter-dropdown__button")}>
                  <button className={cx("btn btn--filled")} type="submit">
                    Hủy bộ lọc này
                  </button>
                  <button className={cx("btn btn--filled")} type="submit">
                    Xem <strong>13</strong> sản phẩm
                  </button>
                </div>
              </div>
            </div>

            <div
              className={cx(
                "search-result__filter-normal__content",
                "search-result__filter-normal__content_cover"
              )}
              onClick={(e: any) => handleFilterItemClick(e)}>
              <p>Đánh giá</p>
              <span className={cx("material-icons-round dropdown-button")}>
                expand_more
              </span>
              <div
                className={cx("dropdown-content", "dropdown-content__cover")}>
                <div className={cx("filter-list")}>
                  <div className={cx("dropdown-options")}>
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
                  <div className={cx("dropdown-options")}>
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
                  <div className={cx("dropdown-options")}>
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
                  <div className={cx("dropdown-options")}>
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
                  <div className={cx("dropdown-options")}>
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
                <div className={cx("filter-dropdown__button")}>
                  <button className={cx("btn btn--outlined")} type="submit">
                    Hủy bộ lọc này
                  </button>
                  <button className={cx("btn btn--filled")} type="submit">
                    Xem <strong>13</strong> sản phẩm
                  </button>
                </div>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
