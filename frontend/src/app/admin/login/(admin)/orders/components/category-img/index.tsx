"use client";

import { CldImage } from "next-cloudinary";
import classNames from "classnames/bind";

// import css
import styles from "./category-img.module.css";

// use css
const cx = classNames.bind(styles);

export default function CategoryImage({ categoryImg }: { categoryImg: any }) {
  return (
    <div className={cx("category-table__img-div")}>
      <CldImage
        className={cx("category-table__img")}
        src={categoryImg.url}
        alt={categoryImg.alt}
        fill={true}
      />
    </div>
  );
}
