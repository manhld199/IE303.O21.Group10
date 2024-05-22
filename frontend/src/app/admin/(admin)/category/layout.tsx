// import libs
import React from "react";

//import components
import { OrderHeading } from "./partials";

// import css
import "./layout.css";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="order-page-container">
      <OrderHeading />
      {children}
    </main>
  );
}
