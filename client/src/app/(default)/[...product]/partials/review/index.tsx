"use client";

// import libs
import classNames from "classnames/bind";
import React, { useState } from "react";

// import components
import { ProductReviewItem } from "../../components";

// import paritals
import { ProductReviewHeader, ProductImageModal } from "./partials";

// import css
import styles from "./review.module.css";

// use css
const cx = classNames.bind(styles);

export default function ProductReview({
  reviewOverview,
  productReviews,
}: {
  reviewOverview: any;
  productReviews: any;
  productId: any;
}) {
  const [isModalHidden, setIsModalHidden] = useState("none");
  const handleOpenModal = () => {
    if (typeof window !== "undefined") {
      const body = window.document.body;
      body.style.overflow = "hidden";
    }
    setIsModalHidden("block");
  };

  return (
    <section className={cx("product-review")}>
      <h3>Đánh giá từ khách hàng</h3>
      <ProductReviewHeader
        reviewOverview={reviewOverview}
        handleOpenModal={handleOpenModal}></ProductReviewHeader>

      <div className={cx("product-review__filter", "review-filter")}>
        <h5>Lọc đánh giá theo</h5>
        <div className={cx("review-filter__group")}>
          <div className={cx("review-filter__item")}>Mới nhất</div>
          <div className={cx("review-filter__item")}>Có hình ảnh</div>
          <div className={cx("review-filter__item")}>Có video</div>
          <div className={cx("review-filter__item")}>5 sao</div>
          <div className={cx("review-filter__item")}>4 sao</div>
          <div className={cx("review-filter__item")}>3 sao</div>
          <div className={cx("review-filter__item")}>2 sao</div>
          <div className={cx("review-filter__item")}>1 sao</div>
        </div>
      </div>

      <div className={cx("product-review__all-reviews", "reviews")}>
        <h5>Tất cả đánh giá</h5>
        <div className={cx("reviews__group")}>
          {productReviews.map((review, index) => {
            return (
              <React.Fragment key={index}>
                <ProductReviewItem
                  review={review}
                  handleOpenModal={handleOpenModal}></ProductReviewItem>
              </React.Fragment>
            );
          })}
        </div>

        <div className={cx("reviews__pagination-div")}>
          <div className={cx("reviews__pagination", "pagination")}>
            <div className={cx("pagination__btn")}>
              <span className={cx("material-icons-round", "pagination__icon")}>
                arrow_back_ios
              </span>
            </div>
            <div className={cx("pagination__btn")}>1</div>
            <div className={cx("pagination__btn")}>2</div>
            <div className={cx("pagination__btn", "pagination__btn-disabled")}>
              ...
            </div>
            <div className={cx("pagination__btn")}>3</div>
            <div className={cx("pagination__btn")}>
              <span className={cx("material-icons-round", "pagination__icon")}>
                arrow_forward_ios
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProductImageModal
        isModalHidden={isModalHidden}
        setIsModalHidden={setIsModalHidden}></ProductImageModal>
    </section>
  );
}
