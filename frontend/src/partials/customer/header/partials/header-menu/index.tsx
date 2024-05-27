"use client";

// import libs
import React from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

// import function from utils
import { convertNumberToMoney } from "@/utils";

// import css
import styles from "./header-menu.module.css";

const cx = classNames.bind(styles);

function CustomerHeaderMenuProductItem({ product }): JSX.Element {
  return (
    <Link
      className={cx("cate-dropdown__product-link")}
      href={`/${product.product_slug}?pid=${product.product_id}`}
      title={product.product_name}>
      <span className={cx("cate-dropdown__product-img-container")}>
        <CldImage
          src={product.product_img.url}
          alt={product.product_img.alt}
          fill
        />
      </span>
      <span className={cx("cate-dropdown__product-name")}>
        {product.product_name}
      </span>
      <div>
        {product.variant_discount_amount == 0 ? (
          <span className={cx("cate-dropdown__product-price")}>
            {convertNumberToMoney(product.variant_price)}
          </span>
        ) : (
          <>
            <span className={cx("cate-dropdown__product-price")}>
              {convertNumberToMoney(
                (product.variant_price *
                  (100 - product.variant_discount_amount)) /
                  100
              )}
            </span>
            <del className={cx("cate-dropdown__product-price--discount")}>
              {convertNumberToMoney(product.variant_price)}
            </del>
          </>
        )}
      </div>
    </Link>
  );
}

function CustomerHeaderMenuSubCategoryItem({ subCategory }): JSX.Element {
  const hasProducts: boolean = subCategory?.products.length > 0;

  return hasProducts ? (
    <li className={cx("cate-dropdown__wrapper")}>
      <Link
        className={cx("cate-dropdown__info")}
        href={`/search?c=${subCategory.category.category_name}`}>
        <span className={cx("cate-dropdown__img-container")}>
          <CldImage
            src={subCategory.category.category_img_url}
            alt={`Hình đại cho phân loại ${subCategory.category.category_img_alt} của ForCat Shop`}
            fill
          />
        </span>
        <span className={cx("cate-dropdown__sub-cate")}>
          {subCategory.category.category_name}
        </span>{" "}
        <span>({subCategory?.products?.length ?? 0})</span>
      </Link>

      <div className={cx("cate-dropdown__content")}>
        <div className={cx("cate-dropdown__title")}>
          <span>Sản phẩm bán chạy nhất</span>
          <Link
            className={cx("cate-dropdown__title-link")}
            href={`/search?c=${subCategory.category.category_name}`}>
            <span>Xem tất cả {subCategory.products.length} sản phẩm</span>
            <span className="material-icons-outlined">chevron_right</span>
          </Link>
        </div>
        <div className={cx("cate-dropdown__products")}>
          {(subCategory.products.slice(0, 4) ?? []).map((product, index) => (
            <React.Fragment key={"category product" + index}>
              <CustomerHeaderMenuProductItem product={product} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </li>
  ) : (
    <></>
  );
}

function CustomerHeaderMenuCategoryItem(
  props: IHeaderMenuCategoryItemProps
): JSX.Element {
  return (
    <li className={cx("menu__item")}>
      <div className={cx("menu__cate")}>
        <span className={cx("menu__item-p")}>{props.categoryType}</span>
        {props.children && (
          <span className="material-icons-outlined">expand_more</span>
        )}
      </div>
      {props.children}
    </li>
  );
}

export default function CustomerHeaderMenu({
  links,
  categoryProducts,
}): JSX.Element {
  return (
    <ul className={cx("header__menu")}>
      <CustomerHeaderMenuCategoryItem categoryType="Danh mục sản phẩm">
        <div className={cx("menu__cate-dropdown-container")}>
          <ul className={cx("menu__cate-dropdown")}>
            {(categoryProducts ?? []).map((categoryProduct, index) => (
              <React.Fragment key={"sub-category" + index}>
                <CustomerHeaderMenuSubCategoryItem
                  subCategory={categoryProduct}
                />
              </React.Fragment>
            ))}
          </ul>
        </div>
      </CustomerHeaderMenuCategoryItem>

      {(links ?? []).map((link) => (
        <li key={link.title} className={cx("menu__item")}>
          <Link className={cx("menu__cate")} href={link.url}>
            <span className={cx("menu__item-p")}>{link.title}</span>
            {link.iconData && (
              <span className={"material-icons " + cx(link.className)}>
                {link.iconData}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
