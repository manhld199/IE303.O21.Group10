// use components
import { CustomerFooter, CustomerHeader, CustomerAppBar } from "@/partials";
// import { CustomerBreadcrumb } from "@/components";
import { Scrollup, ContactAside } from "@/components";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomerHeader />
      {/* <CustomerBreadcrumb /> */}
      <Scrollup />
      <ContactAside />
      {children}
      <CustomerFooter />
      <CustomerAppBar></CustomerAppBar>
    </>
  );
}
