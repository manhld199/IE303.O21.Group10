// import libs
import classNames from "classnames/bind";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

// import utils
import { convertNumberToMoney } from "@/utils";

// import css
import styles from "./style.module.css";

const cx = classNames.bind(styles);

export default function CustomerHeaderItemUlt({ product }) {
  return (
    <Link
      href={`/${product.product_slug}/${product.variant_slug}?pid=${product.product_id}`}
      className={cx("header__item-ult")}>
      <div className={cx("header__item-ult__title")}>
        <div
          className={cx("header__item-ult__title__link")}
          title={product.product_name}
          // Đường dẫn của sản phẩm
        >
          {product.product_name}
        </div>
        <div className={cx("header__item-ult__title__price")}>
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
        </div>
      </div>
      <div className={cx("header__item-ult__thumbs")}>
        <div className={cx("header__item-ult__thumbs__link")}>
          <CldImage
            className={cx("header__item-ult__thumbs__img")}
            src={product.product_img.url} // Sử dụng link hình ảnh từ dữ liệu sản phẩm
            alt={product.product_img.alt} // Sử dụng alt từ dữ liệu sản phẩm
            width={100} // Đặt chiều rộng và chiều cao của ảnh theo ý muốn
            height={100}
          />
        </div>
      </div>
    </Link>
  );
}
