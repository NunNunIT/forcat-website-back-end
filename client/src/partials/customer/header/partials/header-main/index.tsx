"use client";

// import libs
import classNameNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";

// import components
import { CustomerLogo, CustomerHeaderItemUlt } from "@/components";

// import css
import styles from "./header-main.module.css";

const cx = classNameNames.bind(styles);

export default function CustomerHeaderMain({
  params,
  searchParams,
}: {
  params?: { "*": string };
  searchParams?: { [key: string]: string };
}) {
  console.log(JSON.stringify(searchParams));
  const searchKey = searchParams?.searchKey ?? 0;
  console.log("searchKey từ Header", searchKey);
  console.log("searchKey từ Header", searchParams);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const smartSearchRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        fetchSearchResults(inputValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      smartSearchRef.current &&
      !smartSearchRef.current.contains(event.target)
    ) {
      setShowSmartSearch(false);
    }
  };

  const fetchSearchResults = async (inputValue) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/productList/searchRecommended?searchKey=${inputValue}`
      );
      // if (!response.ok) {
      //   throw new Error("Failed to fetch search results");
      // }
      const data = await response.json();
      if (data.data.searchKey === inputValue) {
        console.log("Trả về cho data", data.data.searchKey);
        setSearchResults(data.data.recommendedProducts);
        setTotalSearchResults(data.data.totalProducts);
        setShowSmartSearch(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    if (!inputValue) {
      setShowSmartSearch(false);
    }
  };

  return (
    <div className={cx("header__main")}>
      <CustomerLogo className={cx("header__logo")} />
      <div className={cx("header__search-bar-wrapper")}>
        <form
          className={cx("header__search-bar__main")}
          action="/search-result"
          method="GET">
          <div className={cx("header__search-bar")}>
            <input
              className={cx("header__search-input")}
              id="header__search-input"
              type="search"
              name="searchKey"
              placeholder={searchKey ? searchKey : "Bạn tìm gì..."}
              onChange={handleInputChange}
            />
            <button className={cx("header__search-btn")} type="submit">
              <span className="material-icons-outlined">search</span>
            </button>
          </div>
        </form>
        <div
          ref={smartSearchRef}
          className={cx("header__smart-search-wrapper", {
            "display-block": showSmartSearch,
          })}
          id="header__smart-search-wrapper"
          style={{ display: showSmartSearch ? "block" : "none" }}>
          <div className={cx("header__suggest-results-content")}>
            {showSmartSearch &&
              searchResults.map((product) => (
                <CustomerHeaderItemUlt
                  key={product.product_id_hashed}
                  product={product}
                />
              ))}
          </div>
          <div className={cx("header__suggest-results-more")}>
            <Link className={cx("header__suggest-results-more-link")} href="#">
              Xem thêm{" "}
              <span className={cx("highlight")}>{totalSearchResults}</span> sản
              phẩm
            </Link>
          </div>
        </div>
      </div>

      <div className={cx("dropdown-cart")}>
        <Link
          href="/cart"
          className={cx("header__cart-container")}
          title="Giỏ hàng"
        >
          <div className={cx("header__cart")}>
            <span className="material-icons">shopping_cart</span>
          </div>
        </Link>
        <div className={cx("dropdown-cart__content-container")}>
          <div className={cx("dropdown-cart__content")}>
            <div className={cx("dropdown-cart__unauth-user")}>
              <div className={cx("unauth-user__img-container")}>
                <Image
                  className={cx("unauth-user__img")}
                  src="/imgs/unauth-user.png"
                  alt="unauth-user"
                  fill
                />
              </div>
              <span className={cx("unauth-content__cart")}>
                Đăng nhập để xem Giỏ hàng
              </span>
            </div>
            <div className={cx("unauth-content__btn")}>
              <Link href="/login">Đăng nhập</Link>
              <Link href="/register">Đăng ký</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
