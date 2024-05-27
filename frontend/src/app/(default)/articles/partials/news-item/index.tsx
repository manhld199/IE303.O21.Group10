// import libs
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";

// import utils
import { convertDateToHourDayMonthYear } from "@/utils";

// import css
import styles from "./news-item.module.css";

const cx = classNames.bind(styles);

export default function CustomerNewsItem(props: INewsItemProps) {
  const {
    article_id,
    article_slug,
    article_title,
    article_subtitle,
    article_avt,
    article_type,
    article_short_description,
    article_author,
    article_published_date,
  } = props;

  return (
    <Link
      className={cx("news__link")}
      href={`/news/${article_slug}?aid=${article_id}`}>
      <article className={cx("news__container")}>
        <div className={cx("news__content-container")}>
          <span className={cx("news__type")}>{article_type}</span>
          <h3 className={cx("news__name")}>{article_title}</h3>
          <div className={cx("news__info")}>
            <p className={cx("news__short-description")}>
              {article_short_description}
            </p>
          </div>
        </div>
        <div className={cx("news__cover-container")}>
          <Image src={article_avt.url} alt={article_avt.alt} fill />
        </div>
      </article>
    </Link>
  );
}
