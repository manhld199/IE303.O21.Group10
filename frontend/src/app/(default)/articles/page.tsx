// import libs
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// import partials, components
import { CustomerNewsItem, CustomerSearchNewBar } from "./partials";

// import utils
import { BACKEND_URL_NEWS } from "@/utils/commonConst";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Khám phá tin tức mới nhất về thế giới thú cưng tại ForCat Shop. Chúng tôi cập nhật những thông tin hữu ích về cách chăm sóc, nuôi dưỡng và yêu thương thú cưng của bạn. Duyệt qua bài viết về các sản phẩm mới, những mẹo hữu ích và các sự kiện đặc biệt. ForCat Shop luôn đồng hành cùng bạn trong hành trình chăm sóc và tạo niềm vui cho thú cưng của bạn!",
};

const getFullBackendArticleUrl = (): string => {
  return `${BACKEND_URL_NEWS}`;
};

interface IResponseNews {
  articles: INewsItemProps[];
}

const fetcher = async (url: string) => {
  const res: Response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const json = await res.json();
  return json;
};

export default async function NewsPage() {
  const fullURL: string = getFullBackendArticleUrl();
  const data: IResponseNews = await fetcher(fullURL);

  if (!data || !Array.isArray(data)) {
    return (
      <main className="news-page__container">
        <div className="news-page__top">
          <h1>Tin tức</h1>
          <CustomerSearchNewBar />
        </div>
        <section className="news__group-news-item">
          <p>Không có bài viết nào.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="news-page__container">
      <div className="news-page__top">
        <h1>Tin tức</h1>
        <CustomerSearchNewBar />
      </div>
      <section className="news__group-news-item">
        {data.map((articleData: INewsItemProps) => (
          <CustomerNewsItem key={articleData.article_id} {...articleData} />
        ))}
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
