// import libs
// import useSWR, { Fetcher } from "swr";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// import partials
import { CustomerReviewItem } from "./partials";

// import utils
import { BACKEND_URL_ORDERS } from "@/utils/commonConst";

// import css
import "./page.css";

const fetcher = async (url: string) => {
  const RES: Response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cookie": `accessToken=${cookies().get("accessToken").value}`
    },
  });
  const JSON: IResponseJSON = await RES.json();
  if (!JSON.success) return notFound();
  return JSON.data as IReviewItem[];
};

const getFullBackendURL = (orderId: string) =>
  BACKEND_URL_ORDERS
  + `/${orderId}/reviews`;

export default async function ReviewPage({
  params,
}: {
  params: { orderId: string };
}) {
  const fullURL = getFullBackendURL(params.orderId);
  const data = await fetcher(fullURL);

  return (
    <div className="review">
      <h2>Đánh giá sản phẩm</h2>
      <div className="review-wrapper">
        {data.map((item: IReviewItem) => (
          <CustomerReviewItem
            key={item.product_id_hashed}
            order_id={params.orderId}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
