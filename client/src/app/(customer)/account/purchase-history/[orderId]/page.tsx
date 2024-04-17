"use client";

// import libs
import useSWR, { Fetcher } from "swr";
import { notFound } from "next/navigation";
import Skeleton from "react-loading-skeleton";

// import utils
import { BACKEND_URL_ORDERS } from "@/utils/commonConst";
import {
  convertDateToFormatHHMMDDMMYYYY,
  convertOrderStatusToStr,
  parseNumToCurrencyStr,
  convertOrderStatusToIconData,
} from "@/utils";

// import components
import { CustomerProductItemInOrderItem } from "@/components";

// import css
import "./page.css";
import "react-loading-skeleton/dist/skeleton.css";

interface IOrderDetailProps {
  _id: string;
  order_buyer: { order_name: string; order_phone: string };
  order_address: {
    street: string;
    ward: string;
    district: string;
    province: string;
  };
  order_details: IProductItemInOrderItemProps[];
  order_total_cost: number;
  order_status: string;
  payment_id: string;
  createdAt: string;
}

const fetcher: Fetcher<IOrderDetailProps, string> = async (url: string) => {
  const res: IResponseJSON = await fetch(url).then((res) => res.json());

  // if (!res.success) throw res;

  return res.data as IOrderDetailProps;
};

export default function PurchaseDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { data, error, isLoading } = useSWR(
    BACKEND_URL_ORDERS + "/" + params.orderId,
    fetcher
  );

  // if isLoading
  if (isLoading)
    return (
      <main className="order-detail">
        <div className="order-detail--top">
          <span className="order-detail__overview">
            <h2>Chi tiết hóa đơn: #{params.orderId}</h2>
            <Skeleton />
          </span>
          <Skeleton />
        </div>
        <div className="order-detail__info-receive">
          <h2>
            <span className="material-icons">location_on</span>
            <span>Thông tin nhận hàng</span>
          </h2>
          <Skeleton className="order-detail__info-receive-data" count={3} />
        </div>
        <div className="order-detail__paying-method">
          <h2>
            <span className="material-icons">credit_card</span>
            <span>Thông tin thanh toán</span>
          </h2>
          <Skeleton className="order-detail__info-receive-data" />
        </div>
        <div className="order-detail__products">
          <h2>
            <span className="material-icons">shopping_bag</span>
            <span>Thông tin sản phẩm</span>
          </h2>
          <Skeleton className="order-detail__products-wrapper" count={3} />
        </div>
      </main>
    );

  if (error) return notFound();

  const {
    _id,
    order_buyer,
    payment_id,
    order_details,
    order_total_cost,
    order_address,
    order_status,
    createdAt: order_date,
  } = data;
  const { order_name, order_phone } = order_buyer;
  const { street, ward, district, province } = order_address;

  return (
    <main className="order-detail">
      <div className="order-detail--top">
        <span className="order-detail__overview">
          <h2>Chi tiết hóa đơn: #{_id}</h2>
          <span>
            Đặt lúc: {convertDateToFormatHHMMDDMMYYYY(new Date(order_date))}
          </span>
        </span>
        <span className={`order-detail__status ${order_status}`}>
          <span className="material-icons">
            {convertOrderStatusToIconData(order_status)}
          </span>
          {convertOrderStatusToStr(order_status)}
        </span>
      </div>
      <div className="order-detail__info-receive">
        <h2>
          <span className="material-icons">location_on</span>
          <span>Thông tin nhận hàng</span>
        </h2>
        <table className="order-detail__info-receive-data">
          <tbody>
            <tr>
              <th>Người nhận: </th>
              <td>{order_name}</td>
            </tr>
            <tr>
              <th>Số điện thoại:</th>
              <td>{order_phone}</td>
            </tr>
            <tr>
              <th>Địa chỉ: </th>
              <td>{[street, ward, district, province].join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="order-detail__paying-method">
        <h2>
          <span className="material-icons">credit_card</span>
          <span>Thông tin thanh toán</span>
        </h2>
        {/* <PaymentType id={payment_id} /> */}
        <span>Thanh toán bằng thẻ tín dụng</span>
      </div>
      <div className="order-detail__products">
        <h2>
          <span className="material-icons">shopping_bag</span>
          <span>Thông tin sản phẩm</span>
        </h2>
        <div className="order-detail__products-wrapper">
          {order_details.map((product) => (
            <CustomerProductItemInOrderItem
              key={product.product_id_hashed}
              {...product}
            />
          ))}
        </div>
        <hr />
        <table className="order-detail__cost">
          <tbody>
            <tr>
              <th>Tạm tính:</th>
              <td>{parseNumToCurrencyStr(order_total_cost)} đ</td>
            </tr>
            <tr>
              <th>Thành tiền:</th>
              <td>{parseNumToCurrencyStr(order_total_cost)} đ</td>
            </tr>
            <tr>
              <th>Số tiền phải thanh toán:</th>
              <td>{parseNumToCurrencyStr(order_total_cost)} đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
