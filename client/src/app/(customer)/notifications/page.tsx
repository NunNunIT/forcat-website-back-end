// import libs
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Suspense } from "react";

// import partials, components
import { CustomerNotificationWrapper } from "./partials";

// import utils
import { NOTIFICATION_STATUS_LIST } from "@/utils/commonConst";

// import css
import "./page.css";

export default function NotificationPage(
  { searchParams }: { searchParams: { [key: string]: string } }
) {
  const type = searchParams?.type ?? "all";

  if (!NOTIFICATION_STATUS_LIST.includes(type)) return notFound();

  return (
    <section className="notification__content">
      <CustomerNotificationWrapper
        accessToken={cookies().get("accessToken").value}
      />
    </section>
  );
}
