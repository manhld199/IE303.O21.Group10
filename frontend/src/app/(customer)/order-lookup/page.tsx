"use client";

// import libs
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// import utils
import { convertNumberToMoney } from "@/utils";
import { BACKEND_URL, ORDER_STATUS_LIST } from "@/utils/commonConst";

// import css
import "./page.css";

export default function OrderLookupPage() {
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState([{}]);

  return (
    <main className="order-lookup-container">
      <section className="order-lookup-search">
        <h2>Tra cứu thông tin đơn hàng</h2>
        <form className="order-lookup-search-form">
          <div className="search-form__input">
            <span className="material-icons-round">phone_iphone</span>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              className="search-form__input-field"
            />
          </div>
          <button className="search-form__btn" type="button">
            Tra cứu
          </button>
        </form>
      </section>
      <section className="order-lookup-detail order-list">
        {orders.length == 0 ? (
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
              <Link
                href="/order-lookup?type=all"
                className={`order-list__header-item ${
                  searchParams.get("type") == null ||
                  searchParams.get("type") == "all"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Tất cả
              </Link>
              <Link
                href="/order-lookup?type=preparing"
                className={`order-list__header-item ${
                  searchParams.get("type") == "preparing"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Chuẩn bị hàng
              </Link>
              <Link
                href="/order-lookup?type=delivering"
                className={`order-list__header-item ${
                  searchParams.get("type") == "delivering"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Đang giao
              </Link>
              <Link
                href="/order-lookup?type=finished"
                className={`order-list__header-item ${
                  searchParams.get("type") == "finished"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Đã giao
              </Link>
              <Link
                href="/order-lookup?type=canceled"
                className={`order-list__header-item ${
                  searchParams.get("type") == "canceled"
                    ? "order-list__header-item-highlight"
                    : ""
                }`}>
                Đã hủy
              </Link>
            </div>

            <div className="order-list__body">
              <div className="order-list__item">
                <div className="order-list__item-header">
                  <p className="order-list__item-id">
                    <span className="order-list__item-id-title">Đơn hàng:</span>{" "}
                    <span>#66332f0713bed4faf4a55724</span>
                  </p>

                  <p className="order-list__item-status">
                    <span className="material-icons-round">local_shipping</span>
                    <span>Đang giao</span>
                  </p>
                </div>

                <div className="order-list__item-body item-body">
                  <div className="item-body__img-div">
                    <Image
                      className="item-body__img"
                      src="/imgs/icon-ATC.webp"
                      alt="Vui lòng nhập số điện thoại"
                      fill={true}
                    />
                  </div>

                  <div className="item-body__info">
                    <h3>Đồ chơi cần câu mèo bằng dây thép gắn lông</h3>
                    <p>Phân loại hàng: Original</p>
                    <p>Số lượng: 100</p>
                  </div>

                  <div className="item-body__price">27.539 đ</div>
                </div>

                <div className="order-list__item-footer">
                  <p className="order-list__item-footer-total">
                    Thành tiền: 27.539 đ
                  </p>
                </div>
              </div>

              <div className="order-list__item">
                <div className="order-list__item-header">
                  <p className="order-list__item-id">
                    <span className="order-list__item-id-title">Đơn hàng:</span>{" "}
                    <span>#66332f0713bed4faf4a55724</span>
                  </p>

                  <p className="order-list__item-status">
                    <span className="material-icons-round">local_shipping</span>
                    <span>Đang giao</span>
                  </p>
                </div>

                <div className="order-list__item-body item-body">
                  <div className="item-body__img-div">
                    <Image
                      className="item-body__img"
                      src="/imgs/icon-ATC.webp"
                      alt="Vui lòng nhập số điện thoại"
                      fill={true}
                    />
                  </div>

                  <div className="item-body__info">
                    <h3>Đồ chơi cần câu mèo bằng dây thép gắn lông</h3>
                    <p>Phân loại hàng: Original</p>
                    <p>Số lượng: 100</p>
                  </div>

                  <div className="item-body__price">27.539 đ</div>
                </div>

                <div className="order-list__item-footer">
                  <p className="order-list__item-footer-total">
                    Thành tiền: 27.539 đ
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
