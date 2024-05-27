// import libs
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// import partials
import { CustomerTableOfContent } from "./partials";
import { CustomerNewsItem } from "../partials";

// import utils
import { convertDateToHourDayMonthYear } from "@/utils";
import { BACKEND_URL } from "@/utils/commonConst";

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

interface INewsItemProps {
  article_id: string;
  article_slug: string;
  article_title: string;
  article_subtitle: string;
  article_avt: {
    url: string;
    alt: string;
  };
  article_type: string;
  article_short_description: string;
  article_author: string;
  article_published_date: string;
}

// fetch data
const getArticle = async (slug: string, aid: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/articles/getArticle/${aid}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return notFound();

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Fetch error:", error);
    return notFound();
  }
};

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: { articleSlug: string };
    searchParams?: { [key: string]: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { articleSlug } = params;
  const { aid } = searchParams || {};

  if (!aid) return notFound();

  const article: IResponseNewsDetail | null = await getArticle(
    articleSlug,
    aid
  );

  if (!article) return notFound();

  return {
    title: `Tin tức | ${article.article_name}`,
    description: article.article_short_description,
  };
}

export default async function ArticleDetailPage({
  params,
  searchParams,
}: {
  params: { articleSlug: string };
  searchParams?: { [key: string]: string };
}) {
  const { articleSlug } = params;
  const { aid } = searchParams;
  const article = await getArticle(articleSlug, aid);

  return (
    <main className="news-detail-page-container">
      <article className="news-detail-page">
        <div className="new-detail-page--info">
          <span className="news-detail-page__type">{article.article_type}</span>
          <h1 className="news-detail-page__name">{article.article_name}</h1>
          <div className="news-info">
            <div className="news-info__img-container">
              <Image src="/imgs/news-author.webp" alt="Author's avatar" fill />
            </div>
            <address>
              <strong className="news-detail-page__author">
                {article.article_author}
              </strong>
              <time
                className="news-detail-page__date"
                dateTime={article.article_published_date}>
                {article.article_published_date
                  ? convertDateToHourDayMonthYear(
                      article.article_published_date
                    )
                  : ""}
              </time>
            </address>
          </div>
        </div>
        <div
          className="news-detail-pages--content"
          dangerouslySetInnerHTML={{ __html: article.article_description }}
        />
      </article>
      <aside className="news-detail-page__aside">
        <CustomerTableOfContent targetClassName="news-detail-page" />
      </aside>
      {/* <section className="news-detail-page__related-page">
        <h2>Các bài viết liên quan</h2>
        <div className="related-page-container">
          {article.related_articles.length > 0 &&
            article.related_articles.map((newsItem) => (
              <CustomerNewsItem key={newsItem.article_id} {...newsItem} />
            ))}
        </div>
      </section> */}
    </main>
  );
}
