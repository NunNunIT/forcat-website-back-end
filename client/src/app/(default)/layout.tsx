// use metadata
import type { Metadata } from "next";

// use components
import { CustomerFooter, CustomerHeader, CustomerAppBar } from "@/partials";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomerHeader />
      {children}
      <CustomerFooter />
      <CustomerAppBar></CustomerAppBar>
    </>
  );
}
