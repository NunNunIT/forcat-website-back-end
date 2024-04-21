"use client";

// import libs
import { useEffect, useState } from "react";
import { useSearchParams, notFound } from "next/navigation";

// import partials
import { CustomerPagination } from "@/components";
import { CustomerNotificationItem, CustomerSkeletonNotificationItem } from "..";

// import utils
import { BACKEND_URL_NOTIFICATIONS } from "@/utils/commonConst";

interface INotificationWrapperProps {
  accessToken: string;
}

interface IDataResponseNoti {
  notifications: INotiItemProps[],
  maxPage: number;
}

const fetcher = async (url: string, accessToken: string) => {
  try {
    console.log(accessToken);
    const res: Response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `accessToken=${accessToken}`,
      },
      credentials: "include",
      next: { revalidate: 60 },
    });
    if (!res.ok) return notFound();

    const json: IResponseJSON = await res.json();
    if (!json.success) return notFound();

    return json.data as IDataResponseNoti;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

const getFullBackendURLNotifications = (type: string, page: string, limit: string): string => {
  return BACKEND_URL_NOTIFICATIONS + "?"
    + ((type === "all") ? "" : `type=${type}&`)
    + `page=${page}&limit=${limit}`;
}

export default function NotificationWrapper(props: INotificationWrapperProps) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "3";

  const [readAll, setReadAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<IDataResponseNoti | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: IDataResponseNoti = await fetcher(
        getFullBackendURLNotifications(type, page, limit),
        props.accessToken,
      );
      setData(data);
      setIsLoading(false);
    };
    fetchData();
    console.log("data:", data);
  }, []);

  const handleOnClickReadAll = async () => {
    if (!readAll) {
      setReadAll(true);

      // Gửi yêu cầu đánh dấu tất cả thông báo đã đọc
      await fetch(`${BACKEND_URL_NOTIFICATIONS}/readAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `accessToken=${props.accessToken}`,
        },
        credentials: "include",
      });
    }
  };

  return (
    <>
      <div className="notification__content--top">
        <h2 className="notification__title">Thông báo</h2>
        <button
          className="btn_ pri_"
          onClick={handleOnClickReadAll}
        >
          <span>Đánh dấu tất cả đã đọc</span>
        </button>
      </div>
      {isLoading
        ? (<CustomerSkeletonNotificationItem />)
        : data?.notifications?.map((notification: INotiItemProps) => (
          <CustomerNotificationItem
            key={notification._id}
            {...notification}
            readAll={readAll}
          />
        ))}

      {/* Fill blank */}
      <div className="tag-make-fill-blank" />

      {/* Pagination */}
      {!isLoading && data && <div className="noti__pagination">
        <CustomerPagination maxPage={data?.maxPage} />
      </div>}
    </>
  )
}