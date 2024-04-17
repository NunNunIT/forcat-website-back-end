"use client";

// import libs
import classNames from "classnames/bind";
import { CldImage } from "next-cloudinary";

// import utils
import { convertNumberToMoney } from "@/utils";
import { IBuyInfo } from "../../utils";

// import css
import styles from "./order-product.module.css";

// use css
const cx = classNames.bind(styles);

export default function OrderProduct({ buyInfo }: { buyInfo: IBuyInfo }) {
  return (
    <div className={cx("order-product__element__cover")}>
      <div className={cx("order-product__element")}>
        <div>
          <div className={cx("order-product__element--left")}>
            <div className={cx("order-product__img__cover")}>
              <CldImage
                className={cx("order-product__img")}
                fill={true}
                src={buyInfo.variant_image_link}
                alt={buyInfo.variant_image_alt}
              />
            </div>

            <div className={cx("order-product__product-detail")}>
              <h4 className={cx("order-product__product-name")}>
                {buyInfo.product_name}
              </h4>
              <p className={cx("order-product__variant")}>
                Phân loại hàng: {buyInfo.product_name}
              </p>
              <p className={cx("order-product__amount")}>x{buyInfo.quantity}</p>
            </div>
          </div>
        </div>

        <h5 className={cx("order-product__price")}>
          {buyInfo.discount_amount > 0 && (
            <small className={cx("order-product__price--small")}>
              {convertNumberToMoney(buyInfo.unit_price)}
            </small>
          )}
          {convertNumberToMoney(
            (buyInfo.unit_price * (100 - buyInfo.discount_amount)) / 100
          )}
        </h5>
      </div>
      <hr />
    </div>
  );
}
