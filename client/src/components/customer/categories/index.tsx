"use client";

// import libs
import classNames from "classnames/bind";
import { useState, useEffect } from "react"; // Thêm useState và useEffect từ React
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// import components
import { CustomerCategoryCard } from "@/components";

// import css
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./style.module.css";

import { productData } from "./data";

const cx = classNames.bind(styles);

export default function Categories() {
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    setLoadedData(productData);
  }, []);

  const PRODUCT = loadedData.map((item) => (
    <SwiperSlide key={item.id}>
      <CustomerCategoryCard
        initValue={{
          name: item.name,
          url: item.imageurl,
          description: item.description,
        }}
      />
    </SwiperSlide>
  ));

  return (
    <div className={cx("customer_categories")}>
      <Swiper
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          300: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          400: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          868: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        centeredSlides={false}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper">
        {PRODUCT}
      </Swiper>
    </div>
  );
}
