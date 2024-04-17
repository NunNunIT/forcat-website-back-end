import { convertNumberToMoney } from "@/utils";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { CustomerStarRating } from "@/components";
import classNames from "classnames/bind";
import styles from "./carousel.module.css";

const cx = classNames.bind(styles);

export default function CustomerCarouselCard({ product }) {
  return (
    <>
    <div key={product.product_id} className={cx("carousel__card")}>
      <Link className={cx("carousel__card-main")} href={`/${product.product_slug}?pid=${product.product_id}`}>
        {product.highest_discount ? (
          <div className={cx("carousel__card--badge")}>- {product.highest_discount} %</div>
        ) : null}
        <div className={cx("carousel__card--top")}>
          <div className={cx("carousel__card--img")}>
            <CldImage src={product.product_img.link} alt={product.product_img.alt} fill={true} draggable="false" />
          </div>
          <div className={cx("carousel__card-details")}>
            <span className={cx("carousel__card-category")}>{product.category_name ? product.category_name : "FORCAT"}</span>
            <div className={cx("carousel__card-rate")}>
              <CustomerStarRating rating={product.product_avg_rating} />
            </div>
            <h4 title={product.product_name}>{product.product_name}</h4>
            <p> Hàng cực hot </p>
          </div>
        </div>
        <div className={cx("carousel__card-bottom-details")}>
          <div className={cx("carousel__card-price")}>
            
              {product.highest_discount ? (
                <>
                  <h2>{convertNumberToMoney(product.lowest_price)}đ</h2>
                  <small>{convertNumberToMoney(product.product_price)}đ</small>
                </>
              ) : (
                <>
                  <h2>{convertNumberToMoney(product.product_price)}đ</h2>
                  <small className={cx("display-none")}>{" "}alo</small>
                </>

              )}
            
          </div>
        </div>
      </Link>
    </div>
    </>
  );
}
