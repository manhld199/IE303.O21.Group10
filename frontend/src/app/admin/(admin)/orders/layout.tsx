// import libs
import React from "react";

//import components
import { CategoryHeading } from "./partials";

// import css
import "./layout.css";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="category-container">
      <CategoryHeading />
      {children}
    </main>
  );
}
