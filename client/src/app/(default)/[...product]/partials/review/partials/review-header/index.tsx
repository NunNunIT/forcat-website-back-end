"use client";

// import libs
import classNames from "classnames/bind";
import Image from "next/image";
import { CldImage, CldVideoPlayer } from "next-cloudinary";

// import components
import { CustomerRating } from "@/components";

// import css
import styles from "./review-header.module.css";

// use css
const cx = classNames.bind(styles);

export default function ProductReviewHeader({
  reviewOverview,
  handleOpenModal,
}: {
  reviewOverview: any;
  handleOpenModal: any;
}) {
  let recentImages, lastImage, isImageMoreThan8, isImageEmpty;
  if (reviewOverview.recent_images.length >= 8) {
    recentImages = reviewOverview.recent_images.slice(0, 6);
    lastImage = reviewOverview.recent_images.slice(6, 7);
    isImageMoreThan8 = true;
    isImageEmpty = false;
  } else if (reviewOverview.recent_images.length) {
    recentImages = reviewOverview.recent_images;
    isImageMoreThan8 = false;
    isImageEmpty = false;
  } else {
    isImageEmpty = true;
  }

  let recentVideos, lastVideo, isVideoMoreThan4, isVideoEmpty;
  if (reviewOverview.recent_images.length >= 8) {
    recentVideos = reviewOverview.recent_images.slice(0, 2);
    lastVideo = reviewOverview.recent_images.slice(2, 3);
    isVideoMoreThan4 = true;
    isVideoEmpty = false;
  } else if (reviewOverview.recent_images.length) {
    recentVideos = reviewOverview.recent_images;
    isVideoMoreThan4 = false;
    isVideoEmpty = false;
  } else {
    isVideoEmpty = true;
  }

  return (
    <div className={cx("review-header")}>
      <div className={cx("review-overview")}>
        <h5>Tổng quan</h5>
        <div className={cx("review-overview__summary-info")}>
          <div className={cx("review-overview__info")}>
            <span className={cx("review-overview__average")}>
              {reviewOverview.avg_rating}
            </span>
            <CustomerRating
              initValue={{
                fontSize: "24px",
                rating: reviewOverview.avg_rating,
              }}></CustomerRating>
          </div>
          <p className={cx("review-overview__total")}>
            (Tất cả {reviewOverview.total_review} đánh giá)
          </p>
        </div>
        <div
          className={cx("review-overview__detail", "review-overview-detail")}>
          <div className={cx("review-overview-detail__row")}>
            <CustomerRating
              initValue={{ fontSize: "24px", rating: 5 }}></CustomerRating>
            <div className={cx("review-overview-detail__progress-div")}>
              <div
                className={cx("review-overview-detail__progress-bar")}
                style={{
                  width: `${
                    (isNaN(
                      reviewOverview.review_count[4] /
                        reviewOverview.total_review
                    )
                      ? 0
                      : reviewOverview.review_count[4] /
                        reviewOverview.total_review) * 100
                  }%`,
                }}></div>
            </div>
            <span className={cx("review-overview-detail__numbers")}>
              {reviewOverview.review_count[4] ?? 0}
            </span>
          </div>
          <div className={cx("review-overview-detail__row")}>
            <CustomerRating
              initValue={{ fontSize: "24px", rating: 4 }}></CustomerRating>
            <div className={cx("review-overview-detail__progress-div")}>
              <div
                className={cx("review-overview-detail__progress-bar")}
                style={{
                  width: `${
                    (isNaN(
                      reviewOverview.review_count[3] /
                        reviewOverview.total_review
                    )
                      ? 0
                      : reviewOverview.review_count[3] /
                        reviewOverview.total_review) * 100
                  }%`,
                }}></div>
            </div>
            <span className={cx("review-overview-detail__numbers")}>
              {reviewOverview.review_count[3] ?? 0}
            </span>
          </div>
          <div className={cx("review-overview-detail__row")}>
            <CustomerRating
              initValue={{ fontSize: "24px", rating: 3 }}></CustomerRating>
            <div className={cx("review-overview-detail__progress-div")}>
              <div
                className={cx("review-overview-detail__progress-bar")}
                style={{
                  width: `${
                    (isNaN(
                      reviewOverview.review_count[2] /
                        reviewOverview.total_review
                    )
                      ? 0
                      : reviewOverview.review_count[2] /
                        reviewOverview.total_review) * 100
                  }%`,
                }}></div>
            </div>
            <span className={cx("review-overview-detail__numbers")}>
              {reviewOverview.review_count[2] ?? 0}
            </span>
          </div>
          <div className={cx("review-overview-detail__row")}>
            <CustomerRating
              initValue={{ fontSize: "24px", rating: 2 }}></CustomerRating>
            <div className={cx("review-overview-detail__progress-div")}>
              <div
                className={cx("review-overview-detail__progress-bar")}
                style={{
                  width: `${
                    (isNaN(
                      reviewOverview.review_count[1] /
                        reviewOverview.total_review
                    )
                      ? 0
                      : reviewOverview.review_count[1] /
                        reviewOverview.total_review) * 100
                  }%`,
                }}></div>
            </div>
            <span className={cx("review-overview-detail__numbers")}>
              {reviewOverview.review_count[1] ?? 0}
            </span>
          </div>
          <div className={cx("review-overview-detail__row")}>
            <CustomerRating
              initValue={{ fontSize: "24px", rating: 1 }}></CustomerRating>
            <div className={cx("review-overview-detail__progress-div")}>
              <div
                className={cx("review-overview-detail__progress-bar")}
                style={{
                  width: `${
                    (isNaN(
                      reviewOverview.review_count[0] /
                        reviewOverview.total_review
                    )
                      ? 0
                      : reviewOverview.review_count[0] /
                        reviewOverview.total_review) * 100
                  }%`,
                }}></div>
            </div>
            <span className={cx("review-overview-detail__numbers")}>
              {reviewOverview.review_count[0] ?? 0}
            </span>
          </div>
        </div>
      </div>
      <div className={cx("product-review__image-overview", "image-overview")}>
        {isImageEmpty && isVideoEmpty && (
          <div
            className={cx(
              "image-overview__empty-noti-div",
              "image-overview__empty-noti-div--full"
            )}>
            <div
              className={cx(
                "image-overview__empty-noti-img-div",
                "image-overview__empty-noti-img-div--full"
              )}>
              <Image
                className={cx("image-overview__empty-noti")}
                src="/imgs/product-page/no-image.webp"
                alt="Sản phẩm chưa có đánh giá bằng hình ảnh và video"
                fill={true}
              />
            </div>{" "}
            <p className={cx("image-overview__empty-noti-text")}>
              Sản phẩm này chưa có đánh giá bằng hình ảnh và video
            </p>
          </div>
        )}
        {!isImageEmpty && isVideoEmpty && (
          <>
            <h5>Tất cả hình ảnh</h5>
            {isImageEmpty && (
              <div className={cx("image-overview__empty-noti-div")}>
                <div className={cx("image-overview__empty-noti-img-div")}>
                  <Image
                    className={cx("image-overview__empty-noti")}
                    src="/imgs/product-page/no-image.webp"
                    alt="Sản phẩm chưa có đánh giá bằng hình ảnh"
                    fill={true}
                  />
                </div>{" "}
                <p className={cx("image-overview__empty-noti-text")}>
                  Sản phẩm này chưa có đánh giá bằng hình ảnh
                </p>
              </div>
            )}
            {!isImageEmpty && (
              <div className={cx("image-overview__container")}>
                {recentImages.map((item, index) => {
                  return (
                    <div className={cx("image-overview__item")} key={index}>
                      <div
                        className={cx("image-overview__image-div")}
                        onClick={handleOpenModal}>
                        <CldImage
                          className={cx("image-overview__image")}
                          src={item.link}
                          alt={item.alt}
                          fill={true}
                        />
                      </div>
                    </div>
                  );
                })}
                {isImageMoreThan8 && (
                  <div className={cx("image-overview__item")}>
                    <div
                      className={cx("image-overview__gradient")}
                      onClick={handleOpenModal}>
                      Xem thêm
                    </div>
                    <div
                      className={cx("image-overview__image-div")}
                      onClick={handleOpenModal}>
                      <CldImage
                        className={cx("image-overview__image")}
                        src={lastImage.link}
                        alt={lastImage.link.alt}
                        fill={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <h5>Tất cả video</h5>
            {isVideoEmpty && (
              <div className={cx("image-overview__empty-noti-div")}>
                <div className={cx("image-overview__empty-noti-img-div")}>
                  <Image
                    className={cx("image-overview__empty-noti")}
                    src="/imgs/product-page/no-image.webp"
                    alt="Sản phẩm chưa có đánh giá bằng video"
                    fill={true}
                  />
                </div>{" "}
                <p className={cx("image-overview__empty-noti-text")}>
                  Sản phẩm này chưa có đánh giá bằng video
                </p>
              </div>
            )}
            {!isVideoEmpty && (
              <div className={cx("video-overview__container")}>
                {recentVideos.map((item, index) => {
                  return (
                    <div className={cx("video-overview__item")} key={index}>
                      {/* <CldVideoPlayer
                  className={cx("video-overview__video")}
                  src={item.link}
                /> */}
                    </div>
                  );
                })}
                {isVideoMoreThan4 && (
                  <div className={cx("video-overview__item")}>
                    <div className={cx("video-overview__gradient")}>
                      Xem thêm
                    </div>
                    <video className={cx("video-overview__video")} controls>
                      <source src="/vids/test.mp4" type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
