"use client";

// import libs
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useState, useRef, useEffect } from "react";

// import utils
import { convertMoneyToNumber, convertNumberToMoney } from "@/utils";
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import "./page.css";

const getCartProducts = async (cartItems: any) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/products/getCartProducts?pid=${cartItems
        .map((item) => item.product_id)
        .join(",")}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching recommend products:", error);
  }
};

// let checkboxes, cartItems;
export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [checkboxes, setChecboxes] = useState(null);
  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    const cartStorageItems = JSON.parse(
      localStorage.getItem("cartItems")
    )?.payload;

    if (cartStorageItems?.length) {
      const fetchData = async () => {
        try {
          const data = await getCartProducts(cartStorageItems);

          const cartInfo = [];
          cartStorageItems.forEach((cartStorageItem, index) => {
            const dataIndex = data.findIndex(
              (item) => item.product_id == cartStorageItem.product_id
            );
            const cartItem = {
              product_id: data[dataIndex].product_id,
              product_name: data[dataIndex].product_name,
              product_slug: data[dataIndex].product_slug,
              product_variants: data[dataIndex].product_variants.map(
                (productVariant) => ({
                  cart_quantity: -1,
                  variant_id: productVariant.variant_id,
                  variant_name: productVariant.variant_name,
                  variant_slug: productVariant.variant_slug,
                  variant_price: productVariant.variant_price,
                  variant_img: productVariant.variant_img,
                  variant_discount: productVariant.variant_discount,
                  variant_in_stock: productVariant.variant_in_stock,
                })
              ),
            };
            // console.log(index, "cart", data[dataIndex]);
            cartInfo.push(cartItem);

            let variantIndex = cartInfo[index].product_variants.findIndex(
              (variant) => variant.variant_id == cartStorageItem.variant_id
            );

            if (variantIndex != -1)
              cartInfo[index].product_variants[variantIndex].cart_quantity =
                cartStorageItem.quantity;
          });

          setCart(cartInfo);

          setChecboxes(
            Array.from(window.document.querySelectorAll(".cart-checkbox"))
          );
          setCartItems(
            Array.from(window.document.querySelectorAll(".cart-item")).slice(1)
          );
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, []);

  // handle checkbox
  const checkAll = useRef(null);

  // handle prices
  const [originalPrice, setOriginalPrice] = useState("0đ");
  const [discountedPrice, setDiscountedPrice] = useState("0đ");
  const [totalPrice, setTotalPrice] = useState("0đ");

  // handle count
  const [selectedItem, setSelectedItem] = useState(0);
  const [allItem, setAllItem] = useState(0);

  useEffect(() => {
    if (cartItems) setAllItem(cartItems.length);
  }, [cartItems]);

  // calc prices
  const calcPrices = () => {
    let original = 0;
    let total = 0;
    let discounted = 0;

    cartItems?.forEach((item: any) => {
      if ((item.querySelector(".cart-checkbox") as HTMLInputElement).checked) {
        const unit = item.querySelector(
          ".cart-item__unit-price-after-discount"
        );
        const u = convertMoneyToNumber(unit.innerHTML);

        const del = item.querySelector(
          ".cart-item__unit-price-before-discount del"
        );
        const o = convertMoneyToNumber(
          del != null ? del.innerHTML : unit.innerHTML
        );

        const inputEle = item.querySelector(".quantity-input-group__input");
        if (!inputEle.value) inputEle.value = inputEle.placeholder;

        const q = Number(inputEle.value);

        original += o * q;
        total += u * q;
        discounted += o * q - u * q;
      }
    });

    setOriginalPrice(convertNumberToMoney(original));
    setDiscountedPrice(convertNumberToMoney(discounted));
    setTotalPrice(convertNumberToMoney(total));
  };

  // click check all
  const handleCheckAll = () => {
    checkboxes.forEach(
      (checkbox: any) => (checkbox.checked = checkAll.current.checked)
    );

    countSelectedItem();
    calcPrices();
  };

  const handleCheckAllFooter = () => {
    checkboxes[0].checked = !checkboxes[0].checked;
  };

  // click check one
  const handleCheckOne = (event) => {
    // set checkall to false when 1 is not checked
    if (event.currentTarget.checked == false) checkAll.current.checked = false;

    // set checkall to true when every checkbox is checked
    if (
      event.currentTarget.checked == true &&
      checkboxes.slice(1).every((checkbox: any) => checkbox.checked)
    )
      checkAll.current.checked = true;

    countSelectedItem();
    calcPrices();
  };

  // count item
  const countSelectedItem = () => {
    const selected = cartItems.filter(
      (item: any) => item.querySelector(".cart-checkbox").checked
    );
    setSelectedItem(selected.length);
  };

  // delete cart item
  const handleDeleteCartItem = (event) => {
    const current = event.currentTarget;
    const cartItem = current.parentElement;

    handleUpdateDeletedItem(cartItem);
    cartItem.remove();

    setAllItem(allItem - 1);
    calcPrices();
  };

  // Quantity input group
  // handle value change
  const handleChangeQuantity = (event) => {
    const inputEle = event.target;

    if (Number(inputEle.value) > 100) inputEle.value = 100;
    else if (Number(inputEle.value) < 1) inputEle.value = 1;

    calcProductPrice(Number(inputEle.value), inputEle.parentElement);

    const cartItem =
      event.currentTarget.parentElement.parentElement.parentElement;
    handleUpdateChangedItem(cartItem);
    calcPrices();
  };

  const decreaseValue = (event) => {
    const inputEle = event.currentTarget.nextElementSibling;

    if (!inputEle.value) inputEle.value = inputEle.placeholder;

    if (Number(inputEle.value) > 1) inputEle.value = Number(inputEle.value) - 1;

    calcProductPrice(Number(inputEle.value), inputEle.parentElement);

    const cartItem =
      event.currentTarget.parentElement.parentElement.parentElement;
    handleUpdateChangedItem(cartItem);
    calcPrices();
  };

  const increaseValue = (event) => {
    const inputEle = event.currentTarget.previousElementSibling;

    if (!inputEle.value) inputEle.value = inputEle.placeholder;

    if (Number(inputEle.value) < 100)
      inputEle.value = Number(inputEle.value) + 1;

    calcProductPrice(Number(inputEle.value), inputEle.parentElement);

    const cartItem =
      event.currentTarget.parentElement.parentElement.parentElement;
    handleUpdateChangedItem(cartItem);
    calcPrices();
  };

  // handle dispatch
  const handleUpdateChangedItem = (cartItem: any) => {
    const productId = cartItem.querySelector("input[name='product_id']").value;
    const variantId = cartItem.querySelector(
      ".cart-item__variant-select"
    ).value;
    const quantity = Number(
      cartItem.querySelector(".quantity-input-group__input").value
    );

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? {
      payload: [],
    };

    // Check if the item already exists in the array
    let duplicatedIndex = -1;
    duplicatedIndex = cartItems.payload.findIndex(
      (item) => item.product_id === productId
    );

    // If the item already exists, update it, otherwise add it to the array
    const updateChangeItems =
      duplicatedIndex !== -1
        ? [
            ...cartItems.payload.slice(0, duplicatedIndex),
            {
              product_id: productId,
              variant_id: variantId,
              quantity: quantity,
            },
            ...cartItems.payload.slice(duplicatedIndex + 1),
          ]
        : [
            ...cartItems.payload,
            {
              product_id: productId,
              variant_id: variantId,
              quantity: quantity,
            },
          ];
    // console.log("up", updateChangeItems);

    localStorage.removeItem("cartItems");
    localStorage.setItem(
      "cartItems",
      JSON.stringify({
        type: "cartItems",
        payload: updateChangeItems,
      })
    );

    // console.log(
    //   "local get change items",
    //   JSON.parse(localStorage.getItem("cartItems"))
    // );
  };

  const handleUpdateDeletedItem = (cartItem: any) => {
    const productId = cartItem.querySelector("input[name='product_id']").value;
    const variantId = cartItem.querySelector(
      ".cart-item__variant-select"
    ).value;

    let duplicatedIndex = -1;
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) ?? {
      payload: [],
    };

    // Check if the item already exists in the array
    duplicatedIndex = cartItems.payload.findIndex(
      (item) => item.variant_id === variantId
    );

    // If the item already exists, delete it, otherwise do nothing
    const updateDeleteItems =
      duplicatedIndex !== -1
        ? [
            ...cartItems.payload.slice(0, duplicatedIndex),
            ...cartItems.payload.slice(duplicatedIndex + 1),
          ]
        : [...cartItems.payload];

    localStorage.removeItem("cartItems");
    localStorage.setItem(
      "cartItems",
      JSON.stringify({
        type: "cartItems",
        payload: updateDeleteItems,
      })
    );

    // console.log(
    //   "local get delte items",
    //   JSON.parse(localStorage.getItem("deleteItems"))
    // );

    // change cart in header
    const headerCartQuantity = document.querySelector(".header-cart-quantity");
    if (headerCartQuantity)
      headerCartQuantity.innerHTML = cartItems.length ?? 0;
  };

  const handleDeleteMultiple = () => {
    const cartItems = document.querySelectorAll(
      ".cart-item .cart-item__first-div .cart-checkbox:checked"
    );

    cartItems.forEach((item) => {
      const cartItem = item.parentElement.parentElement;

      // handle delete cart
      handleUpdateDeletedItem(cartItem);
      cartItem.remove();
    });
  };

  // calc prices
  const calcProductPrice = (quantity: number, inputGroupEle) => {
    const current = inputGroupEle;
    const unitPrice = convertMoneyToNumber(
      current.parentElement.previousSibling.querySelector(
        ".cart-item__unit-price-after-discount"
      ).innerHTML
    );
    const totalProductPrice = current.parentElement.nextSibling;
    totalProductPrice.innerHTML = convertNumberToMoney(unitPrice * quantity);
  };

  // handle variant change
  const handleVariantChange = (event) => {
    const cartItemEle =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    const totalEle = cartItemEle.querySelector(".cart-item__price");
    const unitPrice = convertMoneyToNumber(
      cartItemEle.querySelector(".cart-item__unit-price-after-discount")
        .innerHTML
    );

    const inputEle = cartItemEle.querySelector(".quantity-input-group__input");
    if (!inputEle.value) inputEle.value = inputEle.placeholder;
    const quantity = Number(inputEle.value);

    totalEle.innerHTML = convertNumberToMoney(unitPrice * quantity);

    handleUpdateChangedItem(cartItemEle);
    calcPrices();
  };

  const handleBuyItem = (event) => {
    // event.preventDefault();

    const selectedItems = cartItems.filter(
      (item) => item.querySelector(".cart-checkbox").checked
    );
    const buyList = [];
    selectedItems.forEach((item) => {
      const productId = item.querySelector("input[name='product_id']").value;
      const productName = item.querySelector(
        ".cart-item__text-info-name"
      ).innerHTML;
      const selectEle = item.querySelector(".cart-item__variant-select");
      const variantId = selectEle.value;
      const variantName = (
        Array.from(selectEle.querySelectorAll("option")).find(
          (item: any) => item.value == selectEle.value
        ) as HTMLElement
      ).innerHTML;
      const variantImageLink =
        item.querySelector(".cart-item__image").currentSrc;
      const variantImageAlt = item.querySelector(".cart-item__image").alt;
      const quantity = Number(
        item.querySelector(".quantity-input-group__input").value !== ""
          ? item.querySelector(".quantity-input-group__input").value
          : item.querySelector(".quantity-input-group__input").placeholder
      );
      const unitPrice = convertMoneyToNumber(
        item.querySelector(".cart-item__unit-price-after-discount").innerHTML
      );
      const discountAmount = Number(
        item.querySelector("input[name='discount_amount']").value
      );

      buyList.push({
        product_id: productId,
        product_name: productName,
        variant_id: variantId,
        variant_name: variantName,
        variant_image_link: variantImageLink,
        variant_image_alt: variantImageAlt,
        quantity: quantity,
        unit_price: unitPrice,
        discount_amount: discountAmount,
      });
    });

    localStorage.removeItem("buyItems");
    localStorage.setItem(
      "buyItems",
      JSON.stringify({
        type: "buyItems",
        payload: buyList,
      })
    );

    // console.log(
    //   "local get buy items",
    //   JSON.parse(localStorage.getItem("buyItems"))
    // );
  };

  return (
    <main className="cart">
      <section className="cart-product-group">
        <div className="cart-product-group__title cart-item title">
          <div className="title__item title__check-all">
            <input
              type="checkbox"
              className="cart-checkbox"
              ref={checkAll}
              onClick={handleCheckAll}
            />
            <h3>
              Sản phẩm (<span className="checked-num">{allItem}</span>)
            </h3>
          </div>
          <div className="title__item mobile-hidden">
            <h3>Đơn giá</h3>
          </div>
          <div className="title__item mobile-hidden">
            <h3>Số lượng</h3>
          </div>
          <div className="title__item mobile-hidden">
            <h3>Thành tiền</h3>
          </div>
          <div className="title__item"></div>
          <button
            className="cart-footer-btn__delete-btn cart-footer-btns__btn desktop-hidden mobile-display"
            type="button"
            onClick={handleDeleteMultiple}>
            Xóa
          </button>
        </div>

        {(cart ?? []).map((cartItem, itemIndex) => {
          let currentVariantIndex = cartItem.product_variants.findIndex(
            (item) => item.cart_quantity != -1
          );
          currentVariantIndex =
            currentVariantIndex == -1 ? 0 : currentVariantIndex;

          return (
            <div className="cart-item" key={itemIndex}>
              <div className="cart-item__first-div">
                <input
                  type="hidden"
                  name="product_id"
                  value={cartItem.product_id}
                />
                <input
                  type="checkbox"
                  className="cart-checkbox"
                  onChange={handleCheckOne}
                />
                <Link
                  href={`/${cartItem.product_slug}/${cartItem.product_variants[currentVariantIndex].variant_slug}?pid=${cartItem.product_id}`}
                  className="cart-item__image-div cart-item__link">
                  <CldImage
                    className="cart-item__image"
                    src={
                      cartItem.product_variants[currentVariantIndex].variant_img
                        .url
                    }
                    alt={
                      cartItem.product_variants[currentVariantIndex].variant_img
                        .alt
                    }
                    fill={true}
                  />
                </Link>
              </div>
              <div className="cart-item__info-div cart-item-col">
                <Link
                  href={`/${cartItem.product_slug}/${cartItem.product_variants[currentVariantIndex].variant_slug}?pid=${cartItem.product_id}`}
                  className="cart-item__link">
                  <h4
                    className="cart-item__text-info-name"
                    style={{
                      whiteSpace:
                        (cartItem.product_variants ?? []).length != 0
                          ? "nowrap"
                          : "wrap",
                    }}>
                    {cartItem.product_name}
                  </h4>
                </Link>
                {(cartItem.product_variants ?? []).length != 0 && (
                  <div className="cart-item__variant">
                    <input
                      type="hidden"
                      value={
                        cartItem.product_variants[currentVariantIndex]
                          .variant_id
                      }
                    />

                    <select
                      className="cart-item__variant-select"
                      onChange={handleVariantChange}>
                      <option
                        className="cart-item__variant-name"
                        value={
                          cartItem.product_variants[currentVariantIndex]
                            .variant_id
                        }
                        key={0}>
                        {
                          cartItem.product_variants[currentVariantIndex]
                            .variant_name
                        }
                      </option>

                      {(cartItem.product_variants ?? []).map(
                        (variant, variantIndex) => {
                          if (
                            variant.variant_id !=
                            cartItem.product_variants[currentVariantIndex]
                              .variant_id
                          )
                            return (
                              <option
                                className="cart-item__variant-name"
                                value={variant.variant_id}
                                key={variantIndex}>
                                {variant.variant_name}
                              </option>
                            );
                        }
                      )}
                    </select>
                    <span className="material-icons-round cart-item__variant-icon">
                      keyboard_arrow_down
                    </span>
                  </div>
                )}
              </div>
              <div className="cart-item__unit-price cart-item-col">
                <input
                  type="hidden"
                  name="discount_amount"
                  value={
                    cartItem.product_variants[currentVariantIndex]
                      .variant_discount.discount_amount
                  }
                />
                <div className="cart-item__unit-price-after-discount">
                  {convertNumberToMoney(
                    (cartItem.product_variants[currentVariantIndex]
                      .variant_price *
                      (100 -
                        cartItem.product_variants[currentVariantIndex]
                          .variant_discount.discount_amount)) /
                      100
                  )}
                </div>
                {cartItem.product_variants[currentVariantIndex].variant_discount
                  .discount_amount != 0 && (
                  <div className="cart-item__unit-price-before-discount">
                    <del>
                      {convertNumberToMoney(
                        cartItem.product_variants[currentVariantIndex]
                          .variant_price
                      )}
                    </del>
                  </div>
                )}
              </div>
              <div className="cart-item__quantity cart-item-col">
                <div className="quantity-input-group">
                  <button
                    className="quantity-input-group__btn-remove btn-quantity"
                    onClick={decreaseValue}>
                    <span className="material-icons-round quantity-input-group__icon">
                      remove
                    </span>
                  </button>
                  <input
                    className="quantity-input-group__input input-quantity"
                    type="number"
                    onChange={handleChangeQuantity}
                    min={1}
                    max={100}
                    placeholder={
                      cartItem.product_variants[currentVariantIndex]
                        .cart_quantity
                    }
                  />
                  <button
                    className="quantity-input-group__btn-add btn-quantity"
                    onClick={increaseValue}>
                    <span className="material-icons-round quantity-input-group__icon">
                      add
                    </span>
                  </button>
                </div>
              </div>
              <div className="cart-item__price cart-item-col mobile-hidden">
                {convertNumberToMoney(
                  ((cartItem.product_variants[currentVariantIndex]
                    .variant_price *
                    (100 -
                      cartItem.product_variants[currentVariantIndex]
                        .variant_discount.discount_amount)) /
                    100) *
                    cartItem.product_variants[currentVariantIndex].cart_quantity
                )}
              </div>
              <div
                className="cart-item__remove-btn cart-item-col mobile-hidden"
                onClick={handleDeleteCartItem}>
                <span className="material-icons-round">delete</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="cart-bill tablet-hidden">
        <div className="cart-bill-row">
          <div className="cart-bill-row__title">Giá gốc</div>
          <div className="cart-bill-row__content">{originalPrice}</div>
        </div>
        <div className="cart-bill-row">
          <div className="cart-bill-row__title">Giảm giá</div>
          <div className="cart-bill-row__content">{discountedPrice}</div>
        </div>
        <div className="cart-bill-row cart-bill__line"></div>
        <div className="cart-bill-row cart-bill__total-price">
          <div className="cart-bill-row__title">Tổng tiền</div>
          <div className="cart-bill-row__content">{totalPrice}</div>
        </div>
        <Link
          href={selectedItem > 0 ? "/order-information" : "#"}
          className="cart-bill-row cart-bill__btn"
          onClick={handleBuyItem}>
          Mua hàng (<span className="checked-num">{selectedItem}</span>)
        </Link>
        <div className="cart-bill-row cart-bill-policy">
          Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
          <Link className="cart-bill-policy__link" href="/term-of-use">
            Điều khoản dịch vụ
          </Link>{" "}
          và{" "}
          <Link className="cart-bill-policy__link" href="/privacy-policy">
            Chính sách bảo mật
          </Link>{" "}
          của ForCat.
        </div>
      </section>

      <section className="cart-bill-footer desktop-hidden tablet-display">
        <div className="cart-footer-container">
          <div className="cart-footer-btns small-mobile-hidden">
            <div
              className="cart-footer-btns__check-all-btn cart-footer-btns__btn"
              onClick={() => {
                handleCheckAllFooter();
                handleCheckAll();
              }}>
              Tất cả
              <span className="checked-num mobile-hidden">
                {" ("}
                {allItem}
                {")"}
              </span>
            </div>
            <button
              className="cart-footer-btn__delete-btn cart-footer-btns__btn mobile-hidden"
              type="button"
              onClick={handleDeleteMultiple}>
              Xóa
            </button>
          </div>
          <div className="cart-footer-buy-group">
            <div className="cart-footer-buy-group__pricing">
              <div className="pricing__total-price pricing__text">
                Tổng tiền:{" "}
                <del className="pricing__price-before-discount">
                  {originalPrice}
                </del>
              </div>
              <div className="pricing__price-after-discount pricing__text">
                {totalPrice}
              </div>
            </div>
            <Link
              href={selectedItem > 0 ? "/order-information" : "#"}
              className="cart-footer-buy-group__buy-btn"
              onClick={handleBuyItem}>
              Mua hàng (<span className="checked-num">{selectedItem}</span>)
            </Link>
          </div>
        </div>
        <div className="cart-footer-policy">
          Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
          <Link className="cart-bill-policy__link" href="/term-of-use">
            Điều khoản dịch vụ
          </Link>{" "}
          và{" "}
          <Link className="cart-bill-policy__link" href="/privacy-policy">
            Chính sách bảo mật
          </Link>{" "}
          của ForCat.
        </div>
      </section>
    </main>
  );
}
