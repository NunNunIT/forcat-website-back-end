"use client";

// import libs
import Link from "next/link";
import axios from "axios";
import classNames from "classnames/bind";
import Skeleton from "react-loading-skeleton";

// import utils
import {
  convertOrderStatusToStr,
  parseNumToCurrencyStr,
  convertOrderStatusToIconData,
} from "@/utils";
import { BACKEND_URL_ORDERS } from "@/utils/commonConst";

// import components
import { CustomerProductItemInOrderItem } from "@/components";

// import css
import styles from "./order-item.module.css";
import "react-loading-skeleton/dist/skeleton.css";

const cx = classNames.bind(styles);

export function SkeletonOrderItem() {
  return (
    <div className={cx("order-item")}>
      <span>
        <Skeleton />
      </span>
      <hr />
      <div className={cx("order-item__product-list")}>
        <Skeleton count={3} />
      </div>
      <hr />
      <div className={cx("order-item--bottom")}>
        <Skeleton />
      </div>
    </div>
  );
}

export default function OrderItem(props: IOrderItemProps) {
  const setCancel = async () => {
    try {
      const url: string = `${BACKEND_URL_ORDERS}/${props._id}/cancel`;
      const JSON: IResponseJSON = await axios.post(url).then((res) => res.data);
      props?.mutate();
      return JSON;
    } catch (err) {
      return err;
    }
  };

  return (
    <div className={cx("order-item")}>
      <span className={cx("order-item--top")}>
        Đơn hàng:
        <span className={cx("order-item__id")}>#{props._id}</span>
        <span className={cx("order-item__status", props.order_status)}>
          <span className="material-icons">
            {convertOrderStatusToIconData(props.order_status)}
          </span>
          {convertOrderStatusToStr(props.order_status)}
        </span>
      </span>
      <hr />
      <div className={cx("order-item__product-list")}>
        {props.order_details.map((product: IProductItemInOrderItemProps) => (
          <CustomerProductItemInOrderItem
            key={product.product_id_hashed}
            {...product}
          />
        ))}
      </div>
      <hr />
      <div className={cx("order-item--bottom")}>
        <div className={cx("order-item__total-price")}>
          Thành tiền: {parseNumToCurrencyStr(props.order_total_cost)} đ
        </div>
        <div className={cx("order-item__button-wrapper")}>
          <Link
            className={`btn btn--outlined pri`}
            href={`/account/purchase-history/${props._id}`}
          >
            <span>Xem chi tiết</span>
          </Link>
          {props.order_status == "unpaid" && (
            <button className={`btn btn--outlined danger`} onClick={setCancel}>
              <span>Hủy đơn</span>
            </button>
          )}
          {props.order_status == "delivering" && (
            <button className={`btn btn--filled sec`} disabled={true}>
              <span>Đánh giá</span>
            </button>
          )}
          {props.order_status == "finished" && (
            <Link
              className={`btn btn--filled sec`}
              href={`/account/purchase-history/${props._id}/review`}>
              <span>Đánh giá</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
