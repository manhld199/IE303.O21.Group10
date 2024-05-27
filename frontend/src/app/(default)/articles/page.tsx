// import libs
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import React from "react";

// import partials, components
import { CustomerNewsItem, CustomerSearchNewBar } from "./partials";
import { CustomerPagination } from "@/components";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Khám phá tin tức mới nhất về thế giới thú cưng tại ForCat Shop. Chúng tôi cập nhật những thông tin hữu ích về cách chăm sóc, nuôi dưỡng và yêu thương thú cưng của bạn. Duyệt qua bài viết về các sản phẩm mới, những mẹo hữu ích và các sự kiện đặc biệt. ForCat Shop luôn đồng hành cùng bạn trong hành trình chăm sóc và tạo niềm vui cho thú cưng của bạn!",
};

const getAllArticles = async (page: string) => {
  try {
    const res: Response = await fetch(
      `${BACKEND_URL}/articles/getArticles?p=${page}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return notFound();

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const page = searchParams.p ?? "0";
  const data = await getAllArticles(page);
  const articles = data?.articles;
  const totalPages = data?.totalPages;

  return (
    <main className="news-page__container">
      <div className="news-page__top">
        <h1>Tin tức</h1>
        <CustomerSearchNewBar />
      </div>

      <section className="news__group-news-item">
        {articles?.length > 0 &&
          articles.map((article, index) => (
            <React.Fragment key={"Bài viết" + index}>
              <CustomerNewsItem article={article} />
            </React.Fragment>
          ))}

        <CustomerPagination maxPage={totalPages} />
      </section>

      <aside className="news__group-banner">
        {data.length > 4 && (
          <Link
            href="/search-result?discount=True"
            className="news__banner-container">
            <Image
              src="/imgs/banner/banner.png"
              alt="Banner discount Khuyễn mãi"
              fill
            />
          </Link>
        )}
        <Link
          href="/search-result?discount=True"
          className="news__banner-container">
          <Image
            src="/imgs/banner/banner.png"
            alt="Banner discount Khuyễn mãi"
            fill
          />
        </Link>
      </aside>
    </main>
  );
}
