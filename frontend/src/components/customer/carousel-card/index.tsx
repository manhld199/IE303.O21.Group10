// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

// import utils
import { convertNumberToMoney } from "@/utils";

// import css
import styles from "./carousel.module.css";

const cx = classNames.bind(styles);

export default function CustomerCarouselCard({ product }) {
  return (
    <>
      <div className={cx("carousel__card")}>
        <Link
          className={cx("carousel__card-main")}
          href={`/${product.product_slug}/${product.variant_slug}?pid=${product.product_id}`}>
          {product.variant_discount_amount ? (
            <div className={cx("carousel__card--badge")}>
              - {product.variant_discount_amount} %
            </div>
          ) : null}
          <div className={cx("carousel__card--top")}>
            <div className={cx("carousel__card--img")}>
              <CldImage
                src={product.product_img.url}
                alt={product.product_img.alt}
                fill={true}
                draggable="false"
              />
            </div>
            <div className={cx("carousel__card-details")}>
              <span className={cx("carousel__card-category")}>
                {product.category_name ? product.category_name : "FORCAT"}
              </span>
              <h3 title={product.product_name}>{product.product_name}</h3>
              <p> Hàng cực hot </p>
            </div>
          </div>
          <div className={cx("carousel__card-bottom-details")}>
            <div className={cx("carousel__card-price")}>
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
    </>
  );
}
