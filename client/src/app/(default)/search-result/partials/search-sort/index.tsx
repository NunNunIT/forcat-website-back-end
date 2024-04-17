"use client";

// import libs
import classNames from "classnames/bind";
import { useState, useEffect } from "react";

// import css
import styles from "./search-sort.module.css";

const cx = classNames.bind(styles);

export default function SearchResultSort() {
  const [selectedFilterItem, setSelectedFilterItem] =
    useState<HTMLDivElement | null>(null);

  const handleFilterItemClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isFilterItem = target.closest(".search-result__sort__cover");
    const isDropdownContent = target.closest(".dropdown-content--sort__cover");

    // Nếu phần tử được bấm là một mục filter
    if (isFilterItem) {
      const filterItem = isFilterItem as HTMLDivElement;

      // Đặt lại tất cả các mục filter khác
      const filterItems = document.querySelectorAll(
        ".search-result__sort__cover"
      );
      filterItems.forEach((item: Element) => {
        if (item !== filterItem) {
          (item as HTMLElement).style.borderColor = ""; // Đặt lại màu viền
          const dropdownContent = item.querySelector(
            ".dropdown-content--sort__cover"
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
          ".dropdown-content--sort__cover"
        ) as HTMLDivElement | null;
        if (dropdownContent) {
          dropdownContent.style.display = "none"; // Ẩn dropdown content
        }
      } else {
        filterItem.style.borderColor = "brown"; // Đặt màu viền là nâu
        const dropdownContent = filterItem.querySelector(
          ".dropdown-content--sort__cover"
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
    const isFilterItem = target.closest(".search-result__sort__cover");

    if (!isFilterItem) {
      document
        .querySelectorAll(".search-result__sort__cover")
        .forEach((item: Element) => {
          (item as HTMLElement).style.borderColor = ""; // Reset border color
          const dropdownContent = item.querySelector(
            ".dropdown-content--sort__cover"
          ) as HTMLDivElement | null;
          if (dropdownContent) {
            dropdownContent.style.display = "none"; // Hide dropdown content
          }
        });

      setSelectedFilterItem(null);
    }
  };

  return (
    <div
      className={cx("search-result__sort", "search-result__sort__cover")}
      onClick={(e: any) => handleFilterItemClick(e)}>
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
  );
}
