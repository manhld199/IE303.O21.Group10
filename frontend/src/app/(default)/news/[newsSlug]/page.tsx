// import libs
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// import partials
import { CustomerTableOfContent } from "./partials";
import { CustomerNewsItem } from "../partials";

// import utils
import { BACKEND_URL_NEWS } from "@/utils/commonConst";
import { convertDateToHourDayMonthYear } from "@/utils";

// import css
import "./page.css";

interface IResponseNewsDetail {
  article_name: string;
  article_slug: string;
  article_type: string;
  article_info: {
    author: string;
    published_date: string;
  };
  article_short_description: string;
  article_content: string;
  related_articles: INewsItemProps[];
}

// fetch data
async function getNewsDetail(slug: string, aid: string) {
  try {
    const res = await fetch(
      `${BACKEND_URL_NEWS}/${slug}/${encodeURIComponent(
        aid.replaceAll(" ", "+")
      )}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return notFound();

    const json: IResponseJSON = await res.json();
    if (!json.success) return notFound();

    return json.data as IResponseNewsDetail;
  } catch (error) {
    console.log(error);
    return notFound();
  }
}

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: { newsSlug: string };
    searchParams?: { [key: string]: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { newsSlug } = params;
  const { aid } = searchParams;
  const article: IResponseNewsDetail = await getNewsDetail(newsSlug, aid);

  return {
    title: `Tin tức | ${article.article_name}`,
    description: article.article_short_description,
  };
}

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: { newsSlug: string };
  searchParams?: { [key: string]: string };
}) {
  const newsSlug = params.newsSlug;
  const aid = searchParams.aid;

  const newsDetail: IResponseNewsDetail = await getNewsDetail(newsSlug, aid);

  // const contentWithID = parseHTML(newsDetail.article_content);

  return (
    <main className="news-detail-page-container">
      <article className="news-detail-page">
        <div className="new-detail-page--info">
          <span className="news-detail-page__type">
            {newsDetail.article_type}
          </span>
          <h1 className="news-detail-page__name">{newsDetail.article_name}</h1>
          <div className="news-info">
            <div className="news-info__img-container">
              <Image
                src="/imgs/news-author.webp"
                alt="Author's avatar"
                fill
              />
            </div>
            <address>
              <strong className="news-detail-page__author">
                {newsDetail.article_info.author}
              </strong>
              <time
                className="news-detail-page__date"
                dateTime={newsDetail.article_info.published_date}
              >
                {newsDetail.article_info.published_date
                  ? convertDateToHourDayMonthYear(
                    newsDetail.article_info.published_date
                  )
                  : ""}
              </time>
            </address>
          </div>
        </div>
        <div
          className="news-detail-pages--content"
          dangerouslySetInnerHTML={{ __html: newsDetail.article_content }}
        />
      </article>
      <aside className="news-detail-page__aside">
        <CustomerTableOfContent targetClassName="news-detail-page" />
      </aside>
      <section className="news-detail-page__related-page">
        <h2>Các bài viết liên quan</h2>
        <div className="related-page-container">
          {(newsDetail.related_articles ?? []).length > 0 &&
            (newsDetail.related_articles ?? []).map((newsItem) => (
              <CustomerNewsItem
                key={newsItem.article_id_hashed}
                {...newsItem}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
