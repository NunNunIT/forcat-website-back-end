"use client";
// import libs
import classNames from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// import components
import { CustomerSliderCard } from "@/components";

// import css
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./styles.module.css";

import { sliderImgs } from "./dataslider";

const cx = classNames.bind(styles);

export default function CustomerSlider() {
  const SLIDER_CARD = sliderImgs.map((item) => (
    <SwiperSlide className="custom-slide" key={item.id}>
      <CustomerSliderCard
        initValue={{
          url: item.imageurl,
          description: item.description,
        }}
      />
    </SwiperSlide>
  ));
  return (
    <>
      <div className={cx("customerSlider-container")}>
        <Swiper
          spaceBetween={50}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
          speed={1000} // Tăng tốc độ chuyển động
          effect={"slide"} // Sử dụng hiệu ứng slide
          grabCursor={true} // Biến con trỏ thành bàn tay khi di chuột qua
        >
          {SLIDER_CARD}
        </Swiper>
      </div>
    </>
  );
}
