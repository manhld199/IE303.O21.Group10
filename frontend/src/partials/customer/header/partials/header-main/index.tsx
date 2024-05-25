"use client";

// import libs
import classNames from "classnames/bind";
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// import components, partials
import { CustomerLogo } from "@/components";
import { CustomerSearchBar } from "./partials";

// import css
import styles from "./header-main.module.css";

const cx = classNames.bind(styles);

export default function CustomerHeaderMain() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const cartItemsLocal = JSON.parse(localStorage.getItem("cartItems"));

    if (Date.now() - cartItemsLocal?.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("cartItems");
    }

    setCart(cartItemsLocal);
  }, []);

  return (
    <div className={cx("header__main")}>
      <CustomerLogo className={cx("header__logo")} />
      <Suspense>
        <CustomerSearchBar />
      </Suspense>

      <div className={cx("dropdown-cart")}>
        <Link
          href="/cart"
          className={cx("header__cart-container")}
          title="Giỏ hàng">
          <div className={cx("header__cart")}>
            <span className="material-icons">shopping_cart</span>
            <span
              className={cx("header__cart-quantity", "header-cart-quantity")}>
              {cart?.payload?.length ?? 0}
            </span>
          </div>
        </Link>
        <div className={cx("dropdown-cart__content-container")}>
          <div className={cx("dropdown-cart__content")}>
            <div className={cx("dropdown-cart__auth-user")}>
              {cart ? (
                <>
                  {cart.payload?.length > 0 ? (
                    <>
                      <div className={cx("unauth-user__img-container")}>
                        <Image
                          src="/imgs/icon-ATC.webp"
                          alt="Hình ảnh của bạn có sản phẩm trong giỏ hàng"
                          fill
                        />
                      </div>
                      <span className={cx("content__cart")}>
                        Bấm <Link href="/cart">vào đây</Link>
                        <br />
                        để kiểm tra giỏ hàng nhé!
                      </span>
                    </>
                  ) : (
                    <>
                      <div className={cx("unauth-user__img-container")}>
                        <Image
                          src="/imgs/nothing-result.png"
                          alt="Hình ảnh của bạn chưa có sản phẩm trong giỏ hàng"
                          fill
                        />
                      </div>
                      <span className={cx("content__cart")}>
                        Bạn chưa có sản phẩm
                        <br /> trong giỏ hàng
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className={cx("unauth-user__img-container")}>
                    <Image
                      src="/imgs/nothing-result.png"
                      alt="Hình ảnh của bạn chưa có sản phẩm trong giỏ hàng"
                      fill
                    />
                  </div>
                  <span className={cx("content__cart")}>
                    Bạn chưa có sản phẩm
                    <br /> trong giỏ hàng
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
