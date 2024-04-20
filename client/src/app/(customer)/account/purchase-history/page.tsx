// import libs
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

// import utils
import { BACKEND_URL_ORDERS, ORDER_STATUS_LIST } from "@/utils/commonConst";

// import partials, components
import { CustomerOrderItem, CustomerHistoryStatusNav } from "./partials";
import { CustomerPagination } from "@/components";

// import css
import "./page.css";
import "react-loading-skeleton/dist/skeleton.css";

interface IDataResponseOrder {
  orders: IOrderItemProps[];
  maxPage: number;
}

const fetcher: (url: string) => Promise<IDataResponseOrder> = async (url: string) => {
  const accessTokenString = cookies().get("accessToken").value;

  const res: Response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "accessToken="
        + accessTokenString,
    },
    credentials: "include",
  });
  if (!res.ok) return notFound();

  const json: IResponseJSON = await res.json();
  if (!json.success) return notFound();

  return json.data as IDataResponseOrder;
}

const getFullBackendURLOrders = (status: string, page: string): string => {
  return (
    BACKEND_URL_ORDERS
    + "?"
    + (status === "all" ? "" : `type=${status}&`)
    + `page=${page}&limit=3`
  );
};

export default async function PurchaseHistoryPage(
  { searchParams }:
    { searchParams: { [key: string]: string } }
) {
  // get searchParam status, page
  const currentStatus = searchParams?.status ?? "all";
  const currentPage = searchParams?.page ?? "1";

  const fullURL: string = getFullBackendURLOrders(currentStatus, currentPage);

  // const { data, error, isLoading, mutate } = useSWR(fullURL, fetcher);
  const data = await fetcher(fullURL);

  // check valid status
  if (!ORDER_STATUS_LIST.includes(currentStatus)) return notFound;

  // check valid page
  if (parseInt(currentPage) < 1) return notFound;

  return (
    <div className="account-purchase-history__main">
      <CustomerHistoryStatusNav />

      <section className="purchase-history__purchase-item-list">
        {data.orders.length === 0
          ? (
            <p>Bạn hiện tại chưa đơn hàng nào!!!</p>
          )
          : data.orders.map((order: IOrderItemProps) => (
            <CustomerOrderItem
              key={order._id}
              {...order}
            />
          ))}

        {/* Pagination */}
        <CustomerPagination maxPage={data?.maxPage ?? 1} />
      </section>
    </div>
  );
}
