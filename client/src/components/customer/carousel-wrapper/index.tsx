"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames/bind";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { BACKEND_URL, CLOUDINARY_URL } from "@/utils/commonConst";
import CustomerCarouselCard from "@/components/customer/carousel-card";
import LoadingSpinner from "@/components/default/loading";
import styles from "./carousel.module.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const cx = classNames.bind(styles);

const fetchTopRatedProducts = async () => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/productList/getTopRatedProducts`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch top rated products");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching top rated products:", error);
    throw error;
  }
};

export default function CustomerCarouselSlider() {
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await fetchTopRatedProducts();
        setTopRatedProducts(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <div className={cx("wrapper-carousel")}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Swiper
            autoplay={{ delay: 2500 }}
            breakpoints={{
              200: { slidesPerView: 2, spaceBetween: 5 },
              300: { slidesPerView: 2, spaceBetween: 5 },
              400: { slidesPerView: 2, spaceBetween: 5 },
              640: { slidesPerView: 3, spaceBetween: 5 },
              768: { slidesPerView: 3, spaceBetween: 10 },
              821: { slidesPerView: 3, spaceBetween: 10 },
              868: { slidesPerView: 4, spaceBetween: 10 },
              1024: { slidesPerView: 4, spaceBetween: 10 },
            }}
            centeredSlides={false}
            navigation={true}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}>
            {topRatedProducts.map((product) => (
              <SwiperSlide key={product.product_id}>
                <CustomerCarouselCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
}
