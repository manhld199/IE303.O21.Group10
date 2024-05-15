"use client";

// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

// import utils
import { convertNumberToMoney } from "@/utils";

// import css
import styles from "./style.module.css";

// use classnames
const cx = classNames.bind(styles);

export default function CustomerProductCard({ product }) {
  return (
    <div className={cx("product-card")}>
      <Link
        href={`/${product.product_slug}/${product.variant_slug}?pid=${product.product_id_hashed}`}
        className={cx("product__card-main")}>
        {product.highest_discount ? (
          <div className={cx("product__card--badge")}>
            - {product.highest_discount} %
          </div>
        ) : null}
        <div className={cx("product__card--top")}>
          <div className={cx("product-tumb")}>
            <CldImage
              src={product.product_img.link}
              alt={product.product_img.alt}
              fill={true}
            />
          </div>
          <div className={cx("product-details")}>
            <span className={cx("product-category")}>
              {product.category_name ? product.category_name : "FORCAT"}
            </span>
            <h3 title={product.product_name}>{product.product_name}</h3>
          </div>
        </div>
        <div className={cx("product-bottom-details")}>
          <div className={cx("product-price")}>
            <h3>
              {product.highest_discount && product.lowest_price ? (
                <>
                  {convertNumberToMoney(product.lowest_price)}
                  <small>{convertNumberToMoney(product.product_price)}</small>
                </>
              ) : (
                <>{convertNumberToMoney(product.product_price)}</>
              )}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
