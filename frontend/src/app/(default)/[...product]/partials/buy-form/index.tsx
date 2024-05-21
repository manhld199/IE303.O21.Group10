"use client";

// import libs
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

// import components
import { CustomerQuantityInputGroup } from "@/components";
import { ProductVariant } from "../../components";

// import utils
import { convertNumberToMoney, convertMoneyToNumber } from "@/utils";

// import css
import styles from "./buy-form.module.css";

// import interfaces
import { IBuyForm } from "../../interfaces";

// use css
const cx = classNames.bind(styles);

function filterCurrentVariant(productVariants, currentVariantSlug) {
  return productVariants.filter(
    (variant) => variant.variant_slug == currentVariantSlug
  )[0];
}

export default function ProductBuyForm({
  pid,
  productInfo,
  currentVariantSlug,
  desktopOnly,
  mobileOnly,
  ...props
}: {
  pid: any;
  productInfo: IBuyForm;
  currentVariantSlug: string;
  desktopOnly?: string;
  mobileOnly?: string;
}) {
  const filteredVariant = filterCurrentVariant(
    productInfo.product_variants,
    currentVariantSlug
  );

  const currentVariant = !filteredVariant
    ? productInfo.product_variants[0]
    : filteredVariant;

  const [quantityValue, setQuantityValue] = useState(1);
  const [totalPrice, setTotalPrice] = useState(
    convertNumberToMoney(currentVariant?.price ?? 0)
  );
  const unitPriceRef = useRef(null);

  const handleQuantityChange = () => {
    const unitPrice = convertMoneyToNumber(unitPriceRef.current.innerHTML);
    const total = unitPrice * quantityValue;
    setTotalPrice(convertNumberToMoney(total));
  };

  useEffect(() => {
    handleQuantityChange();
  }, [quantityValue]);

  // handle buy
  const buyFormRef = useRef(null);
  const handleBuyItem = (event) => {
    // event.preventDefault();

    const productId = productInfo.product_id;
    const productName = productInfo.product_name;
    const variantId = currentVariant.variant_id;
    const variantName = currentVariant.variant_name;
    const variantImageLink = currentVariant.variant_img.url;
    const variantImageAlt = currentVariant.variant_img.alt;
    const quantity = Number(
      buyFormRef.current.querySelector(".quantity-input-group__input").value
    );
    const unitPrice = convertMoneyToNumber(unitPriceRef.current.innerHTML);

    localStorage.removeItem("buyItems");
    localStorage.setItem(
      "buyItems",
      JSON.stringify({
        type: "buyItems",
        payload: [
          {
            product_id: productId,
            product_name: productName,
            variant_id: variantId,
            variant_name: variantName,
            variant_image_link: variantImageLink,
            variant_image_alt: variantImageAlt,
            quantity: quantity,
            unit_price: unitPrice,
            discount_amount: currentVariant.variant_discount.discount_amount,
          },
        ],
      })
    );

    // console.log("local", JSON.parse(localStorage.getItem("addBuyItems")));
  };

  const cartModalRef = useRef(null);
  const handleCloseModal = () => {
    const cartModal = cartModalRef.current;
    cartModal.classList.add("hidden");
  };

  // handle change header cart quantity
  const handleChangeCart = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    // Add header cart when add cart
    const cartItemsStorage = JSON.parse(localStorage.getItem("cartItems"));
    const cartItems = cartItemsStorage?.payload ?? [];
    // console.log("ccurrrrr", cartItems);

    // Check if the item already exists in the array
    let duplicatedIndex = -1;
    duplicatedIndex = cartItems.findIndex(
      (item) => item.product_id == productId && item.variant_id == variantId
    );

    const addCartItems =
      duplicatedIndex !== -1
        ? [
            ...cartItems.slice(0, duplicatedIndex),
            {
              product_id: productId,
              variant_id: variantId,
              quantity: quantity,
            },
            ...cartItems.slice(duplicatedIndex + 1),
          ]
        : [
            {
              product_id: productId,
              variant_id: variantId,
              quantity: quantity,
            },
            ...cartItems,
          ];

    localStorage.removeItem("cartItems");
    localStorage.setItem(
      "cartItems",
      JSON.stringify({
        type: "cartItems",
        payload: addCartItems,
      })
    );

    // change cart in header
    const headerCartQuantity = document.querySelector(".header-cart-quantity");
    if (headerCartQuantity)
      headerCartQuantity.innerHTML = String(addCartItems?.length ?? 0);
  };

  // handle add cart
  const handleAddCart = () => {
    const productId = productInfo.product_id;
    const variantId = currentVariant.variant_id;
    const quantity = Number(
      buyFormRef.current.querySelector(".quantity-input-group__input").value
    );

    handleChangeCart(productId, variantId, quantity);
    // console.log(JSON.parse(localStorage.getItem("cartItems")));

    const cartModal = cartModalRef.current;
    cartModal.classList.remove("hidden");

    // auto close modal after 1s
    setTimeout(handleCloseModal, 1000);
  };

  return (
    <section
      className={cx("product-buy-form", "product", desktopOnly, mobileOnly)}
      ref={buyFormRef}>
      <h1 className={cx("product__name")}>{productInfo.product_name}</h1>
      <div className={cx("product__unit-price-div")}>
        <p className={cx("product__unit-price")} ref={unitPriceRef}>
          {convertNumberToMoney(currentVariant?.variant_price ?? 0)}
        </p>
        {currentVariant?.variant_discount.discount_amount > 0 && (
          <p className={cx("product__discount-amount")}>
            -{currentVariant?.variant_discount.discount_amount}%
          </p>
        )}
      </div>
      <div className={cx("product__variants", "variants")}>
        <h3 className={cx("variants__title")}>Loại sản phẩm</h3>
        <div className={cx("variants__group")}>
          {(productInfo.product_variants ?? []).map((item, index) => {
            const variantInfo = {
              id: item.variant_id,
              name: item.variant_name,
              url: `/${productInfo.product_slug}/${item.variant_slug}`,
              image: {
                url: (item.variant_img as any).url,
                alt: (item.variant_img as any).alt,
              },
            };

            if (!filteredVariant && index == 0) {
              return (
                <React.Fragment key={index}>
                  <ProductVariant
                    pid={pid}
                    variant={variantInfo}
                    firstActive={true}></ProductVariant>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={index}>
                  <ProductVariant
                    pid={pid}
                    variant={variantInfo}
                    firstActive={false}></ProductVariant>
                </React.Fragment>
              );
            }
          })}
        </div>
      </div>
      <div className={cx("product__quantity")}>
        <h3>Số lượng</h3>
        <CustomerQuantityInputGroup
          initValue={{
            defaultValue: quantityValue,
            minValue: 1,
            maxValue: 100,
          }}
          takeQuantity={setQuantityValue}></CustomerQuantityInputGroup>
        <p className={cx("product__is-stock")}>
          {currentVariant?.variant_in_stock ?? 0} sản phẩm{" "}
          <span className={cx("product__is-stock-responsive")}>có thể mua</span>
        </p>
      </div>
      <div className={cx("product__total-price-div")}>
        <h3>Tạm tính</h3>
        <p className={cx("product__total-price")}>{totalPrice}</p>
      </div>
      <div className={cx("product__buy-btns", "buy-btns")}>
        <div
          className={cx("buy-btns__add-cart", "add-cart-btn", "buy-btn")}
          onClick={handleAddCart}>
          <span className={cx("material-icons-round", " buy-btn-icon")}>
            add_shopping_cart
          </span>
          <span className={cx("buy-btn-text")}>Giỏ hàng</span>
        </div>
        <div className={cx("cart-modal", "hidden")} ref={cartModalRef}>
          <div
            className={cx("cart-modal__bg")}
            title="Nhấn để thoát"
            onClick={handleCloseModal}></div>
          <div className={cx("cart-modal__content")}>
            <div
              className={cx("cart-modal-close", "modal-icon-div")}
              onClick={handleCloseModal}
              title="Nhấn để thoát">
              <span className={cx("material-icons-round", "modal-icon")}>
                close
              </span>
            </div>
            <div className={cx("cart-modal__image-div")}>
              <Image
                className={cx("cart-modal__image")}
                src="/imgs/cart/add-cart-success.webp"
                alt="Thêm vào giỏ hàng thành công"
                fill={true}
              />
            </div>
            <h3 className={cx("cart-modal__text")}>
              Sản phẩm đã được thêm vào giỏ hàng
            </h3>
          </div>
        </div>

        <Link
          href="/order-information"
          className={cx("buy-btns__buy-now", "buy-now-btn", "buy-btn")}
          onClick={handleBuyItem}>
          <span className={cx("material-icons-round", "buy-btn-icon")}>
            savings
          </span>
          <span className={cx("buy-btn-text")}>Mua ngay</span>
        </Link>
      </div>
    </section>
  );
}
