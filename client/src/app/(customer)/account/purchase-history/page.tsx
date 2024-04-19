"use client";

// import libs
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import useSWR, { Fetcher } from "swr";
import { Suspense } from "react";

// import utils
import { BACKEND_URL_ORDERS, ORDER_STATUS_LIST } from "@/utils/commonConst";

// import partials, components
import { CustomerOrderItem, CustomerHistoryStatusNav } from "./partials";
import { CustomerPagination } from "@/components";
import { SkeletonOrderItem } from "./partials/OrderItem";
import NotFound from "@/app/not-found";

// import css
import "./page.css";
import "react-loading-skeleton/dist/skeleton.css";

const fetcher: Fetcher<ResponseOrderHistory, string> = async (url: string) => {
  const res: Response = await fetch(url);
  const json: IResponseJSON = await res.json();
  // if (!json.success) throw json;

  return json.data as ResponseOrderHistory;
};

const getFullBackendURLOrders = (status: string, page: string): string => {
  return (
    BACKEND_URL_ORDERS
    + "?"
    + (status === "all" ? "" : `type=${status}&`)
    + `page=${page}&limit=3`
  );
};

export default function PurchaseHistoryPage() {
  // console.log("Bé cưwng", localStorage.getItem("currentUser"));

  // use pathName, router
  const pathName = usePathname();
  const router = useRouter();

  // get searchParam status, page
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "all";
  const currentPage = searchParams.get("page") ?? "1";

  const fullURL: string = getFullBackendURLOrders(currentStatus, currentPage);

  const { data, error, isLoading, mutate } = useSWR(fullURL, fetcher);

  // check valid status
  if (!ORDER_STATUS_LIST.includes(currentStatus)) return NotFound();

  if (parseInt(currentPage) < 1) {
    router.push(pathName + `?status=${currentStatus}&page=1`);
    return;
  }

  // check valid page
  if (error?.message?.message == "Page out of range!") {
    router.push(
      pathName
      + `?status=${currentStatus}&page=${error.message.maxPage}`
    );
    return;
  }

  return (
    <Suspense>
      <div className="account-purchase-history__main">
        <CustomerHistoryStatusNav />

        <section className="purchase-history__purchase-item-list">
          {isLoading && (
            <>
              <SkeletonOrderItem />
              <SkeletonOrderItem />
            </>
          )}
          {!isLoading && error && (
            <p>
              Đã có lỗi xảy ra: &#39;{error.message?.message || error.message}
              &#39;
            </p>
          )}
          {!isLoading && !error && data.orders.length === 0 && (
            <p>Bạn chưa có đơn hàng nào</p>
          )}
          {!isLoading &&
            !error &&
            data.orders.map((order: IOrderItemProps) => (
              <CustomerOrderItem key={order._id} {...order} mutate={mutate} />
            ))}

          {/* Pagination */}
          {!isLoading && !error && data?.maxPage > 1 && (
            <CustomerPagination
              currentPage={parseInt(currentPage)}
              maxPage={data?.maxPage ?? 1}
            />
          )}
        </section>
      </div>
    </Suspense>
  );
}
