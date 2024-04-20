// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

// import utils
import { convertNumberToMoney } from "@/utils";

// import css
import styles from "./style.module.css";

const cx = classNames.bind(styles);

export default function CustomerHeaderItemUlt({ product }) {
  // Kiểm tra nếu giá lowest_price và product_price bằng nhau
  const showPrice =
    product.lowest_price === product.product_price
      ? product.lowest_price
      : `${convertNumberToMoney(product.lowest_price)}đ`;

  return (
    <div className={cx("header__item-ult")}>
      <div className={cx("header__item-ult__title")}>
        <Link
          className={cx("header__item-ult__title__link")}
          title={product.product_name}
          href={`/${product.product_slug}?pid=${product.product_id_hashed}`} // Đường dẫn của sản phẩm
        >
          {product.product_name}
        </Link>
        <div className={cx("header__item-ult__title__price")}>
          {showPrice}
          {product.lowest_price !== product.product_price && ( // Kiểm tra nếu lowest_price khác product_price
            <small>{convertNumberToMoney(product.product_price)}đ</small> // Hiển thị product_price trong thẻ small
          )}
        </div>
      </div>
      <div className={cx("header__item-ult__thumbs")}>
        <Link href="#" className={cx("header__item-ult__thumbs__link")}>
          <CldImage
            className={cx("header__item-ult__thumbs__img")}
            src={product.product_img.link} // Sử dụng link hình ảnh từ dữ liệu sản phẩm
            alt={product.product_img.alt} // Sử dụng alt từ dữ liệu sản phẩm
            width={100} // Đặt chiều rộng và chiều cao của ảnh theo ý muốn
            height={100}
          />
        </Link>
      </div>
    </div>
  );
}
