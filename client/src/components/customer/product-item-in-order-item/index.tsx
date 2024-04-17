// import libs
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import classNames from "classnames/bind";
import { parseNumToCurrencyStr } from '@/utils';

// import css
import styles from "./product-item-in-order-item.module.css";

const cx = classNames.bind(styles);

export default function ProductItemInOrderItem(props: IProductItemInOrderItemProps) {
  const price_final: number = props.price_discount ?? props.unit_price;

  return (
    <div className={cx("product-item")}>
      <div className={cx("product-item__img-container")}>
        <CldImage src={props.product_img.link}
          alt={props.product_img.alt}
          fill
        />
      </div>
      <div className={cx("product-item__detail")}>
        <h5>
          {/* TODO: implement the link */}
          <Link className={cx("product-item__name")}
            href={`/${props.product_slug}?pid=${props.product_id_hashed}`}
          >
            {props.product_name}
          </Link>
        </h5>
        <span>Phân loại hàng: {props.variant_name}</span>
        <span>x{props.quantity}</span>
      </div>
      <div className={cx("product-item__prices")}>
        {props.price_discount && <span className={cx("product-item__price-base")}>
          {parseNumToCurrencyStr(props.unit_price)} đ
        </span>}
        <span className={cx("product-item__price-discounted")}>
          {parseNumToCurrencyStr(price_final)} đ
        </span>
      </div>
    </div>
  )
}
