// import libs
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

//import partials
import { SearchResultContainer } from "./partials";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
  description:
    "Kết quả tìm kiếm trên ForCat Shop sẽ giúp bạn dễ dàng tìm thấy những sản phẩm và thông tin mà bạn đang quan tâm. Hãy khám phá các kết quả tìm kiếm và tìm thấy những điều tuyệt vời mà ForCat mang lại cho bạn!",
};

// fetch data
async function getSearchProduct(searchParams) {
  try {
    // Khởi tạo mảng rỗng để chứa các thành phần của query string
    let queryParams = [];
    if (searchParams.q) {
      queryParams.push(`q=${searchParams.q}`);
    }

    if (searchParams.c) {
      queryParams.push(`c=${searchParams.c}`);
    }

    if (searchParams.d) {
      queryParams.push(`d=${searchParams.d}`);
    }

    if (searchParams.r) {
      queryParams = [`r=${searchParams.r}`];
    }

    if (searchParams.n) {
      queryParams = [`n=${searchParams.n}`];
    }

    // // Thêm page vào queryParams
    // queryParams.push(`page=${searchParams.page}`);

    // Tạo chuỗi query bằng cách nối các thành phần trong queryParams bằng "&"
    const queryString = queryParams.join("&");

    const res = await fetch(`${BACKEND_URL}/search/products?${queryString}`, {
      next: { revalidate: 60 },
    });

    const data = await res.json();

    return data;
  } catch {
    return notFound();
  }
}

export default async function SearchResultPage({
  params,
  searchParams,
}: {
  params: { "search-result": string };
  searchParams?: { [key: string]: string };
}) {
  // console.log("Lấy từ url", searchKey);
  let itemFind;
  if (searchParams.q) {
    itemFind = searchParams.q;
  } else if (searchParams.c && !searchParams.q) {
    itemFind = searchParams.c;
  } else if (searchParams.d && !searchParams.q && !searchParams.c) {
    itemFind = "discountTrue";
  } else if (searchParams.r) {
    itemFind = "recommendTrue";
  } else if (searchParams.n) {
    itemFind = "newTrue";
  }

  const searchResults = await getSearchProduct(searchParams);

  return (
    <SearchResultContainer itemFind={itemFind} searchResults={searchResults} />
  );
}
