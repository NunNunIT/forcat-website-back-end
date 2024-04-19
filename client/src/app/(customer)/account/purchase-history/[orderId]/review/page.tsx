"use client";

// import libs
import useSWR, { Fetcher } from "swr";
import { notFound } from "next/navigation";

// import partials
import { CustomerReviewItem, CustomerSkeletonReviewItem } from "./partials";

// import utils
import { BACKEND_URL_ORDERS } from "@/utils/commonConst";

// import css
import "./page.css";

const fetcher: Fetcher<IReviewItem[], string> = async (url: string) => {
  const RES: Response = await fetch(url);
  const JSON: IResponseJSON = await RES.json();
  // if (!JSON.success) throw JSON;
  return JSON.data as IReviewItem[];
};

export default function ReviewPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { data, error, isLoading } = useSWR(
    BACKEND_URL_ORDERS + `/${params.orderId}/reviews`,
    fetcher
  );

  if (error) return notFound();

  return (
    <div className="review">
      <h2>Đánh giá sản phẩm</h2>
      <div className="review-wrapper">
        {isLoading
          ? <CustomerSkeletonReviewItem />
          : data.map((item: IReviewItem) => (
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
