"use client";

// import libs
import classNames from "classnames/bind";
import { useState } from "react";

// import css
import styles from "./specification.module.css";

// use css
const cx = classNames.bind(styles);

export default function ProductSpecification({
  productDetails,
  ...props
}: {
  productDetails: any;
}) {
  const [isSeeMoreActive, setIsSeeMoreActive] = useState(false);

  const handleSeeMore = () => {
    setIsSeeMoreActive(!isSeeMoreActive);
  };

  return (
    <section className={cx("specifications")}>
      <div className={cx("specifications__title")}>
        <h3>Thông số kỹ thuật</h3>
        <div className={cx("specifications__see-more")} onClick={handleSeeMore}>
          <p className={cx("specifications__see-more-text")}>
            {isSeeMoreActive ? "Thu gọn" : "Xem thêm"}
          </p>
          {isSeeMoreActive ? (
            <span className="material-icons-round">undo</span>
          ) : (
            <span className="material-icons-round">arrow_forward</span>
          )}
        </div>
      </div>
      <div
        className={cx(
          "specifications__table",
          isSeeMoreActive ? "full-height" : ""
        )}>
        {Object.keys(productDetails).map((key, index) => {
          return (
            <div className={cx("specifications__item")} key={index}>
              <div className={cx("specifications__type")}>
                {productDetails[key].name}
              </div>
              <div className={cx("specifications__info")}>
                {productDetails[key].value}
              </div>
            </div>
          );
        })}
      </div>
      <div className={cx("specifications__see-more", "see-more-btn")}>
        {!isSeeMoreActive && (
          <div className={cx("see-more-btn__gradient")}></div>
        )}
        <div className={cx("see-more-btn__text")} onClick={handleSeeMore}>
          {isSeeMoreActive ? "Thu gọn" : "Xem thêm"}
        </div>
      </div>
    </section>
  );
}
