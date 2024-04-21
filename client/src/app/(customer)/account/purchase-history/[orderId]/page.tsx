// import libs
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

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

const fetcher = async (url: string) => {
  try {
    const res: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `accessToken=${cookies().get("accessToken").value}`,
      },
      credentials: "include",
    });
    const json: IResponseJSON = await res.json();
    return json.data as IOrderDetailProps;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

const getFullBackendURLOrder = (orderId: string): string => {
  return `${BACKEND_URL_ORDERS}/${orderId}`;
}

export default async function PurchaseDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const fullURL = getFullBackendURLOrder(params.orderId);
  const data = await fetcher(fullURL);
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
          <h2>Chi tiết hóa đơn: #{params.orderId}</h2>
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
