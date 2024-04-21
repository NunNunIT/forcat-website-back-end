"use client";

// import libs
import classNames from "classnames/bind";
import { useState } from "react";

// import css
import styles from "./description.module.css";

// use css
const cx = classNames.bind(styles);

export default function ProductDescription({
  productDescription,
  mobileOnly,
}: {
  productDescription: string;
  mobileOnly?: string;
}) {
  const [isSeeMoreActive, setIsSeeMoreActive] = useState(false);

  const handleSeeMore = () => {
    setIsSeeMoreActive(!isSeeMoreActive);
  };

  return (
    <section className={cx("product-description", mobileOnly)}>
      <div className={cx("product-description__title-div")}>
        <h3 className={cx("product-description__title")}>Mô tả sản phẩm</h3>
        <div className={cx("product-description__see-more")}>
          <p
            className={cx("product-description__see-more-text")}
            onClick={handleSeeMore}>
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
          "product-description__content",
          "product-description-content",
          isSeeMoreActive ? "full-height" : ""
        )}
        dangerouslySetInnerHTML={{ __html: productDescription }}>
        {/* <h5 className={cx("product-description-content__title")}>
          Vẻ ngoài thời trang cùng màu sắc mới mẻ
        </h5>
        <p className={cx("product-description-content__paragraph")}>
          Redmi Note 12 được tạo hình bằng một vẻ ngoài quen thuộc với các cạnh
          cùng hai mặt vát phẳng tinh tế, những vị trí giao nhau giữa mặt lưng
          và bộ khung cũng sẽ được bo cong nhẹ để mang lại cảm giác cầm nắm
          thoải mái.
        </p>
        <div className={cx("product-description-content__image-div")}>
          <Image
            className={cx("product-description-content__image")}
            src="/imgs/test.png"
            alt="Anh san pham"
            fill={true}
          />
        </div>
        <p className={cx("product-description-content__image-caption")}>
          Hình ảnh điện thoại redme
        </p> */}
      </div>
      <div className={cx("product-description__see-more", "see-more-btn")}>
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
