"use client";
// import libs
import Link from "next/link";
import classNames from "classnames/bind";
import Image from "next/image";

// import css
import styles from "./style.module.css";

const cx = classNames.bind(styles);

export default function CustomerCategoryCard({
  initValue,
  ...props
}: {
  initValue: ICategoryCardProps;
}) {
  return (
    <div className={cx("category-card")}>
      <Link href="#" className={cx("category__link")}>
        <div className={cx("category-image-div")}>
          <Image
            className={cx("category__link-image")}
            src={initValue.url}
            alt="product image"
            fill={true}
          />
        </div>
        <h3 className={cx("category__link-name")}>{initValue.name}</h3>
      </Link>
    </div>
  );
}
