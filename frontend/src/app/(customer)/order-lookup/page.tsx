"use client";

// import libs
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CldImage } from "next-cloudinary";

// import utils
import { convertNumberToMoney } from "@/utils";
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import "./page.css";

const getOrders = async (phoneNumber: string) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/orders/lookup/${phoneNumber}`,
      { next: { revalidate: 0 } }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching recommend products:", error);
  }
};

export default function OrderLookupPage() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const phoneNumber = searchParams.get("phone");
    if (phoneNumber) {
      const fetchOrders = async () => {
        const orders = await getOrders(phoneNumber);

        const type = searchParams.get("type") ?? "";
        if (type == "all" || type == "") setOrders(orders?.all_orders);
        else if (type == "preparing") setOrders(orders?.preparing_orders);
        else if (type == "delivering") setOrders(orders?.delivering_orders);
        else if (type == "finished") setOrders(orders?.finished_orders);
        else if (type == "canceled") setOrders(orders?.canceled_orders);
      };

      fetchOrders();
    }
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const current = event.currentTarget;
    const phoneNumber = (
      current.querySelector("input[name='phone_number']") as HTMLInputElement
    ).value;

    location.href = `${pathName}?phone=${phoneNumber}`;
  };

  return (
    <main className="order-lookup-container">
      <section className="order-lookup-search">
        <h2>Tra cứu thông tin đơn hàng</h2>
        <form className="order-lookup-search-form" onSubmit={handleSubmit}>
          <div className="search-form__input">
            <span className="material-icons-round">phone_iphone</span>
            <input
              type="text"
              placeholder={searchParams.get("phone") ?? "Nhập số điện thoại"}
              name="phone_number"
              className="search-form__input-field"
            />
          </div>
          <button className="search-form__btn" type="submit">
            Tra cứu
          </button>
        </form>
      </section>
      <section className="order-lookup-detail order-list">
        {orders?.length == 0 ? (
          <div className="order-list__noti-div">
            <div className="order-list__img-div">
              <Image
                className="order-list__img"
                src="/imgs/icon-ATC.webp"
                alt="Vui lòng nhập số điện thoại"
                fill={true}
              />
            </div>
            <div className="order-list__text">
              Vui lòng nhập số điện thoại để tra cứu!
            </div>
          </div>
        ) : (
          <>
            <div className="order-list__header">
              <a
                href={`/order-lookup?phone=${searchParams.get(
                  "phone"
                )}&type=all`}
                className={`order-list__header-item ${
                  searchParams.get("type") == null ||
                  searchParams.get("type") == "all"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Tất cả
              </a>
              <a
                href={`/order-lookup?phone=${searchParams.get(
                  "phone"
                )}&type=preparing`}
                className={`order-list__header-item ${
                  searchParams.get("type") == "preparing"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Chuẩn bị hàng
              </a>
              <a
                href={`/order-lookup?phone=${searchParams.get(
                  "phone"
                )}&type=delivering`}
                className={`order-list__header-item ${
                  searchParams.get("type") == "delivering"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Đang giao
              </a>
              <a
                href={`/order-lookup?phone=${searchParams.get(
                  "phone"
                )}&type=finished`}
                className={`order-list__header-item ${
                  searchParams.get("type") == "finished"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Đã giao
              </a>
              <a
                href={`/order-lookup?phone=${searchParams.get(
                  "phone"
                )}&type=canceled`}
                className={`order-list__header-item ${
                  searchParams.get("type") == "canceled"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Đã hủy
              </a>
            </div>

            {orders?.length &&
              orders.map((order, index) => (
                <div className="order-list__body">
                  <div className="order-list__item" key={"Đơn hàng" + index}>
                    <div className="order-list__item-header">
                      <p className="order-list__item-id">
                        <span className="order-list__item-id-title">
                          Đơn hàng:
                        </span>{" "}
                        <span>#{order.order_id}</span>
                      </p>

                      <p className="order-list__item-status">
                        <span className="material-icons-round">
                          local_shipping
                        </span>
                        <span>{order.order_process_info}</span>
                      </p>
                    </div>
                    {order?.order_details?.length &&
                      order?.order_details.map((item, index) => (
                        <div
                          className="order-list__item-body item-body"
                          key={"Sản phẩm" + index}>
                          <Link
                            href={`/${item.product_slug}/${item.variant_slug}?pid=${item.product_id}`}
                            className="item-body__img-div">
                            <Image
                              className="item-body__img"
                              src={item.product_img.url}
                              alt={item.product_img.alt}
                              fill={true}
                            />
                          </Link>

                          <div className="item-body__info">
                            <Link
                              href={`/${item.product_slug}/${item.variant_slug}?pid=${item.product_id}`}
                              className="item-body__info-link">
                              <h3>{item.product_name}</h3>
                            </Link>
                            <p>Phân loại hàng: {item.variant_name}</p>
                            <p>Số lượng: {item.quantity}</p>
                          </div>

                          <div className="item-body__price">
                            {convertNumberToMoney(
                              item.unit_price * item.quantity
                            )}
                          </div>
                        </div>
                      ))}

                    <div className="order-list__item-footer">
                      <p className="order-list__item-footer-total">
                        Thành tiền:{" "}
                        {convertNumberToMoney(order.order_total_cost)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </section>
    </main>
  );
}
