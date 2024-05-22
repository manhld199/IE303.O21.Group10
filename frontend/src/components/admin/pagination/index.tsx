"use client";

// import libs
import Link from "next/link";
import classNames from "classnames/bind";

// import css
import styles from "./pagination.module.css";
import { useState } from "react";

// use css
const cx = classNames.bind(styles);

export default function ProductPagination({
  page,
  totalPages,
}: {
  page: any;
  totalPages: any;
}) {
  const [currentPage, setCurrentPage] = useState(page);

  const handleClickPrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleClickNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleClickPagination = (event) => {
    const current = event.currentTarget;
    setCurrentPage(current.innerHTML - 1);
  };

  return (
    <div className={cx("product-page-pagination")}>
      <button
        className={cx(
          "product-page-pagination__item",
          "product-page-pagination__item-first"
        )}
        onClick={handleClickPrev}>
        <span className={cx("material-icons-round")}>navigate_before</span>
      </button>

      {Array(totalPages)
        .fill(null)
        .map((_, index) => {
          return (
            <Link
              className={cx(
                "product-page-pagination__item",
                currentPage == index
                  ? "product-page-pagination__item-highlight"
                  : ""
              )}
              onClick={handleClickPagination}
              key={"pagination" + index}
              href={`/admin/products?p=${index}`}>
              {index + 1}
            </Link>
          );
        })}

      {/* <div className={cx("product-page-pagination__item")}>1</div>
      <div className={cx("product-page-pagination__item")}>2</div>
      <div
        className={cx(
          "product-page-pagination__item",
          "product-page-pagination__item-dot"
        )}>
        ...
      </div>
      <div className={cx("product-page-pagination__item")}>5</div> */}
      <button
        className={cx(
          "product-page-pagination__item",
          "product-page-pagination__item-last"
        )}
        onClick={handleClickNext}>
        <span className={cx("material-icons-round")}>navigate_next</span>
      </button>
    </div>
  );
}
