"use client";

// import libs
import classNames from "classnames/bind";
import { CldImage, CldVideoPlayer } from "next-cloudinary";

// import components
import { CustomerRating } from "@/components";

// import interfaces
import { IReview } from "../../interfaces";

// import utils
import { convertDateToHourDayMonthYear } from "@/utils";

// import css
import styles from "./review-item.module.css";
import { relative } from "path";

// use css
const cx = classNames.bind(styles);

export default function ProductReviewItem({
  review,
  handleOpenModal,
}: {
  review: IReview;
  handleOpenModal: any;
}) {
  return (
    <div className={cx("review-item")}>
      <div className={cx("review-item__info")}>
        <div className={cx("review-item__avatar-div")}>
          <CldImage
            className={cx("review-item__avatar")}
            src={review.user_info.user_avt}
            alt={review.user_info.user_name}
            fill={true}
          />
        </div>
        <div className={cx("review-item__info-div")}>
          <p className={cx("review-item__user-name")}>
            {review.user_info.user_name}
          </p>
          <div className={cx("review-item__rating")}>
            <span className={cx("review-item__rating-number")}>
              {review.review_rating}/5
            </span>
            <CustomerRating
              initValue={{
                fontSize: "24px",
                rating: review.review_rating,
              }}></CustomerRating>
          </div>
          <div className={cx("review-item__variant")}>
            Phân loại: {review.product_variant_name}
          </div>
        </div>
      </div>
      <div className={cx("review-item__content")}>
        <p className={cx("review-item__date")}>
          Đã đánh giá vào {convertDateToHourDayMonthYear(review.createdAt)}
        </p>
        <p className={cx("review-item__text")}>{review.review_context}</p>
        <div className={cx("review-item__image-group")}>
          {review.review_video.map((item, index) => {
            return (
              <CldImage
                key={index}
                className={cx("review-item__video")}
                src={item.link}
                alt={item.alt}
                width="100"
                height="100"
              />
            );
          })}
          {review.review_imgs.map((item, index) => {
            return (
              <div
                className={cx("review-item__image-div")}
                onClick={handleOpenModal}
                key={index}>
                <CldImage
                  className={cx("review-item__image")}
                  src={item.link}
                  alt={item.alt}
                  fill={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
