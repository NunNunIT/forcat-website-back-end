// import partials
import { CustomerFooter, CustomerHeader, CustomerAppBar } from "@/partials";

export default function CustomerLayout({
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
