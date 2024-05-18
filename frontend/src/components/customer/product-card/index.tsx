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
        href={`/${product.product_slug}/${product.variant_slug}?pid=${product.product_id}`}
        className={cx("product__card-main")}>
        {product.variant_discount_amount ? (
          <div className={cx("product__card--badge")}>
            - {product.variant_discount_amount} %
          </div>
        ) : null}
        <div className={cx("product__card--top")}>
          <div className={cx("product-tumb")}>
            <CldImage
              src={product.product_img.url}
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
              {product.variant_discount_amount == 0 ? (
                <>{convertNumberToMoney(product.variant_price)}</>
              ) : (
                <>
                  {convertNumberToMoney(
                    (product.variant_price *
                      (100 - product.variant_discount_amount)) /
                      100
                  )}
                  <small>{convertNumberToMoney(product.variant_price)}</small>
                </>
              )}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
