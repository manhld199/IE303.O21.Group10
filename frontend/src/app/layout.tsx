// use metadata
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

// use styles
import "./global.css";

// import components
import { Scrollup, ContactAside } from "@/components";

const quicksand = Quicksand({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "ForCat",
  referrer: "origin-when-cross-origin",
  keywords: [
    "cửa hàng",
    "phụ kiện",
    "thú cưng",
    "ForCat",
    "ForCatShop",
    "FORCAT",
    "FORCATSHOP",
    "forcat",
    "forcatshop",
    "forCat",
    "Forcat",
    "forcatShop",
    "forCatShop",
    "thu cung",
    "thú cung",
    "phụ kien",
    "phụ kiện mèo",
    " phu kien meo",
    "FORcat",
    "forCAT",
    "ForCat Shop - Cửa hàng phụ kiện thú cưng",
    "forcat shop",
    "ForCat Shop",
    "FORCAT SHOP",
    "Forcat Shop",
    "Forcat shop",
    "forcat shop - cửa hàng phụ kiện thú cưng",
    "For cat shop",
    "for cat shop",
    "for cat",
    "For cat",
    "Shop for cat",
    "Shop For Cat",
    "For cat Shop",
    "SHOP FOR CAT",
    "FORCAT SHOP",
    "đồ cho mèo",
    "phụ kiện cho mèo",
    "phụ kiện mèo",
    "đồ mèo",
    "phu kien meo",
    "do cho meo",
  ],
  title: {
    template: "ForCat | %s ",
    default: "ForCat",
  },
  description:
    "ForCat Shop tự hào là cửa hàng uy tín hàng đầu, chuyên cung cấp các sản phẩm và phụ kiện dành cho thú cưng. Khám phá bộ sưu tập đa dạng của chúng tôi bao gồm đồ chơi, thức ăn, đồ dùng vệ sinh và nhiều hơn nữa để chăm sóc và làm hài lòng thú cưng của bạn.",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/dmjwq3ebx/image/upload/v1713440707/SEO_Images/Open%20Graph%20Image/openGraph_img.png",
        alt: "Ảnh nền",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={quicksand.className}>
      <body>
        {children}
        <Scrollup />
        <ContactAside />
      </body>
    </html>
  );
}
