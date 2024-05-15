// import libs
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";

// import utils
import { convertDateToHourDayMonthYear } from "@/utils";

// import css
import styles from "./news-item.module.css";

const cx = classNames.bind(styles);

export default function ArticleItem(props: INewsItemProps) {
  const {
    article_id_hashed,
    article_slug,
    article_name,
    article_avt,
    article_type,
    article_short_description,
    article_info,
    article_date,
  } = props;

  return (
    <Link
      className={cx("news__link")}
      href={`/news/${article_slug}?aid=${article_id_hashed}`}
    >
      <article className={cx("news__container")}>
        <div className={cx("news__content-container")}>
          <span className={cx("news__type")}>{article_type}</span>
          <h3 className={cx("news__name")}>{article_name}</h3>
          <div className={cx("news__info")}>
            {/* <address>
              <span>
                Bởi:{" "}
                <strong className={cx("news__author")}>
                  {" "}
                  {article_info.author}
                </strong>
              </span>
              <time dateTime={article_date}>
                {article_info.published_date
                  ? convertDateToHourDayMonthYear(article_info.published_date)
                  : ""}
              </time>
            </address> */}
            <p className={cx("news__short-description")}>
              {article_short_description}
            </p>
          </div>
        </div>
        <div className={cx("news__cover-container")}>
          <Image
            src={`${article_avt.link}`}
            alt={`${article_avt.alt}`}
            fill
          />
        </div>
      </article>
    </Link>
  );
}
