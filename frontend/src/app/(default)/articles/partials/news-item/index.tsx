// import libs
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";

// import css
import styles from "./news-item.module.css";

const cx = classNames.bind(styles);

export default function CustomerNewsItem({ article }) {
  return (
    <Link
      className={cx("news__link")}
      href={`/news/${article.article_slug}?aid=${article.article_id}`}>
      <article className={cx("news__container")}>
        <div className={cx("news__content-container")}>
          <span className={cx("news__type")}>{article.article_type}</span>
          <h3 className={cx("news__name")}>{article.article_title}</h3>
          <div className={cx("news__info")}>
            <p className={cx("news__short-description")}>
              {article.article_short_description}
            </p>
          </div>
        </div>
        <div className={cx("news__cover-container")}>
          <Image
            src={article.article_avt.url}
            alt={article.article_avt.alt}
            fill
          />
        </div>
      </article>
    </Link>
  );
}
