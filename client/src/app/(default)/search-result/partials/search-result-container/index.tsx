"use client";

// import libs
import classNames from "classnames/bind";
import React from "react";
import { useState, useEffect } from "react";

// import css
import styles from "./search-result-container.module.css";
const cx = classNames.bind(styles);

// import components
import { CustomerProductCard, CustomerPagination } from "@/components";

// import css
import "./search-result.css";

export default function SearchResultPage({ searchKey, searchResults }) {
  const totalResults = searchResults.totalResults;
  const totalPage = searchResults.totalPages;
  const currentPage = searchResults.currentPage;

  let searchResultsProducts;
  // console.log("Từ khóa tìm kiếm", searchKey);

  if (searchResults) {
    searchResultsProducts = searchResults.searchProducts;
  } else {
    searchResultsProducts = [];
  }
  // console.log("Từ khóa tìm kiếm", searchResultsProducts);

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

  // search sort
  const [selectedFilterItemSort, setSelectedFilterItemSort] =
    useState<HTMLDivElement | null>(null);

  const handleFilterItemClickSort = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isFilterItemSort = target.closest(".search-result__sort__cover");
    const isDropdownContentSort = target.closest(
      ".dropdown-content--sort__cover"
    );

    // Nếu phần tử được bấm là một mục filter
    if (isFilterItemSort) {
      const filterItemSort = isFilterItemSort as HTMLDivElement;

      // Đặt lại tất cả các mục filter khác
      const filterItemsSort = document.querySelectorAll(
        ".search-result__sort__cover"
      );
      filterItemsSort.forEach((item: Element) => {
        if (item !== filterItemSort) {
          (item as HTMLElement).style.borderColor = ""; // Đặt lại màu viền
          const dropdownContentSort = item.querySelector(
            ".dropdown-content--sort__cover"
          ) as HTMLDivElement | null;
          if (dropdownContentSort) {
            dropdownContentSort.style.display = "none"; // Ẩn dropdown content
          }
        }
      });

      // Hiển thị hoặc ẩn dropdown content cho mục filter được bấm
      if (filterItemSort.style.borderColor === "brown") {
        filterItemSort.style.borderColor = ""; // Đặt lại màu viền
        const dropdownContent = filterItemSort.querySelector(
          ".dropdown-content--sort__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "none"; // Ẩn dropdown content
        }
      } else {
        filterItemSort.style.borderColor = "brown"; // Đặt màu viền là nâu
        const dropdownContent = filterItemSort.querySelector(
          ".dropdown-content--sort__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "flex"; // Hiển thị dropdown content
        }
      }

      setSelectedFilterItemSort(filterItemSort);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClickSort);

    // Clean up: Gỡ bỏ sự kiện khi component unmount
    return () => {
      document.body.removeEventListener("click", handleBodyClickSort);
    };
  }, []);

  const handleBodyClickSort = (event: MouseEvent) => {
    const targetSort = event.target as HTMLElement;
    const isFilterItemSort = targetSort.closest(".search-result__sort__cover");

    if (!isFilterItemSort) {
      document
        .querySelectorAll(".search-result__sort__cover")
        .forEach((item: Element) => {
          (item as HTMLElement).style.borderColor = ""; // Reset border color
          const dropdownContentSort = item.querySelector(
            ".dropdown-content--sort__cover"
          ) as HTMLDivElement | null;
          if (dropdownContentSort) {
            dropdownContentSort.style.display = "none"; // Hide dropdown content
          }
        });

      setSelectedFilterItemSort(null);
    }
  };

  return (
    <main className="search-result__container">
      {/* <SearchResultFilter /> */}
      <div>
        <section className={cx("search-result__filter")}>
          <div className={cx("search-result__filter-normal")}>
            <h5 className={cx("search-result__filter-normal__title")}>
              Bộ lọc:
            </h5>
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
                {/* Comment */}
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
                {/* Comment */}
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
                {/* Comment */}
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
        </section>
      </div>

      {/* <SearchResultHeadingMobile /> */}
      <section className="search-result__main">
        <h1 className="search-result__heading">
          Kết quả tìm kiếm
          <span className="search-result__heading-after"></span>
        </h1>
        <div className="search-result__main__heading">
          <p className="search-result__main__count">
            Tìm thấy
            <span className="search-result__highlight">
              {" "}
              {totalResults}{" "}
            </span>{" "}
            kết quả cho từ khóa &quot;
            <span className="search-result__key">{searchKey} </span>&quot;
          </p>
          {/* <SearchResultSort /> */}
          <div
            className={cx("search-result__sort", "search-result__sort__cover")}
            onClick={(e: any) => handleFilterItemClickSort(e)}>
            <p className={cx("search-result__sort-title")}>Sắp xếp theo:</p>
            <div className={cx("search-result__sort-content")}>
              <p>Nổi bật</p>
              <span className={cx("material-icons-round")}>expand_more</span>
            </div>
            <div
              className={cx(
                "dropdown-content--sort",
                "dropdown-content--sort__cover"
              )}>
              <div className={cx("dropdown-options")}>
                <input
                  className={cx("sort-option")}
                  type="radio"
                  id="hot"
                  name="sort"
                  value="hot"
                />
                <label htmlFor="hot" className={cx("sort-label")}>
                  Nổi bật
                </label>
              </div>
              <hr />
              <div className={cx("dropdown-options")}>
                <input
                  className={cx("sort-option")}
                  type="radio"
                  id="sale"
                  name="sort"
                  value="sale"
                />
                <label htmlFor="hot" className={cx("sort-label")}>
                  Bán chạy
                </label>
              </div>
              <hr />
              <div className={cx("dropdown-options")}>
                <input
                  className={cx("sort-option")}
                  type="radio"
                  id="price-z-to-a"
                  name="sort"
                  value="price-z-to-a"
                />
                <label htmlFor="hot" className={cx("sort-label")}>
                  Giá cao đến thấp
                </label>
              </div>
              <hr />
              <div className={cx("dropdown-options")}>
                <input
                  className={cx("sort-option")}
                  type="radio"
                  id="price-a-to-z"
                  name="sort"
                  value="price-a-to-z"
                />
                <label htmlFor="hot" className={cx("sort-label")}>
                  Giá thấp đến cao
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="search-result__main-card">
          {searchResultsProducts &&
            searchResultsProducts.length >= 0 &&
            searchResultsProducts.map((product) => (
              <>
                <CustomerProductCard
                  key={product.product_id}
                  product={product}
                />
              </>
            ))}
        </div>
        <div className="pagination">
          <CustomerPagination maxPage={totalPage} />
        </div>
      </section>
    </main>
  );
}
