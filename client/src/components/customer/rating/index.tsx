"use client";

// import libs
import classNames from "classnames/bind";
import { useState, useEffect } from "react";

// import css
import styles from "./rating.module.css";

// use css
const cx = classNames.bind(styles);

export default function CustomerRating({
  initValue,
  ...props
}: {
  initValue: IRating;
}) {
  const [responsiveFontSize, setResponsiveFontSize] = useState(
    initValue.fontSize
  );

  useEffect(() => {
    if (window.innerWidth == 1024 && window.innerWidth > 768) {
      if (initValue.fontSize == "24px") {
        setResponsiveFontSize("20px");
      }
    } else if (window.innerWidth <= 768 && window.innerWidth > 416) {
      if (initValue.fontSize == "24px") {
        setResponsiveFontSize("16px");
      }
    } else if (window.innerWidth <= 416) {
      if (initValue.fontSize == "24px") {
        setResponsiveFontSize("20px");
      }
    }
  }, []);

  console.log(responsiveFontSize);

  return (
    <div className={cx("rating__stars")}>
      {Array(5)
        .fill(null)
        .map((item, index) => {
          if (
            Math.floor(initValue.rating) >= index + 1 ||
            (initValue.rating - index >= 0.5 && initValue.rating - index < 1)
          )
            return (
              <span
                key={index}
                style={{ fontSize: responsiveFontSize }}
                className={cx("material-icons-round", "star-fill")}>
                star
              </span>
            );
          else
            return (
              <span
                key={index}
                style={{ fontSize: responsiveFontSize }}
                className={cx("material-icons-round", "star-empty")}>
                star
              </span>
            );
        })}
    </div>
  );
}
