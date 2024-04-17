"use client";
// import libs
import classNames from "classnames/bind";
import Image from "next/image";

// import css
import styles from "./styles.module.css";

const cx = classNames.bind(styles);
export default function CustomerSliderCard({
  initValue,
  ...props
}: {
  initValue: ISliderCardProps;
}) {
  return (
    <div className={cx("customerSlider_card-container")}>
      <Image
        className={cx("customerSlider_card-img")}
        fill={true}
        src={initValue.url}
        alt={initValue.description}
      />
    </div>
  );
}
