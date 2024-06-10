// import libs
import React from "react";
import Link from "next/link";

// import components
import { AdminPagination } from "@/components";
import {
  CategoryImg,
  CategoryCheckOne,
  CategoryCheckAll,
  CategoryDeleteOne,
  CategoryDeleteMulti,
  CategorySaveBtn,
} from "./components";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";
import { convertNumberToMoney } from "@/utils";

// import css
import "./page.css";

const getAllOrders = async (query: String, page: String) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/admin/orders/getAllOrders?q=${query}&p=${page}`,
      { next: { revalidate: 60 } }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching recommend products:", error);
  }
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const q = searchParams.q ?? "";
  const p = searchParams.p ?? "0";
  const data = await getAllOrders(q, p);

  const orders = data?.orders ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <main className="order-page-container">
      <h2 className="order-page-container__title">Danh sách đơn hàng</h2>
      <section className="order-page-head">
        <div className="order-page-head__item order-page-head__item--left">
          <button
            className="order-page__btn order-page__btn-import"
            type="button">
            <span className="material-icons-round order-page__btn-icon">
              download
            </span>
            <span className="order-page__btn-text">Nhập</span>
          </button>
          <button
            className="order-page__btn order-page__btn-export"
            type="button">
            <span className="material-icons-round order-page__btn-icon">
              publish
            </span>
            <span className="order-page__btn-text">Xuất</span>
          </button>
        </div>
        <div className="order-page-head__item order-page-head__item--right">
          {/* <Link
            href="/admin/products/add"
            className="order-page__btn order-page__btn-add"
            type="button">
            <span className="material-icons-round order-page__btn-icon">
              add
            </span>
            <span className="order-page__btn-text">Thêm</span>
          </Link> */}
          <CategoryDeleteMulti />
          <CategorySaveBtn />
        </div>
      </section>

      <section className="order-page-content">
        <div className="order-page-table-head">
          <form className="order-page-search">
            <input
              className="order-page-search__input"
              type="text"
              name="q"
              placeholder={q ? q : "Tìm đơn hàng"}
            />
            <button className="order-page-search__icon" type="submit">
              <span className="material-icons-round">search</span>
            </button>
          </form>

          {totalPages > 1 && <AdminPagination totalPages={totalPages} />}
        </div>
        <table className="order-page-table">
          <thead>
            <tr className="order-page-table__row">
              <th className="order-page-table__title">
                <CategoryCheckAll />
              </th>
              {/* <th className="order-page-table__title">Hình ảnh</th> */}
              <th className="order-page-table__title">Mã đơn hàng</th>
              <th className="order-page-table__title">Tên khách hàng</th>
              <th className="order-page-table__title">Số điện thoại</th>
              <th className="order-page-table__title">Trạng thái</th>
              <th className="order-page-table__title">Tổng tiền</th>
              <th className="order-page-table__title">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr
                  className="order-page-table__row order-page-table__product"
                  key={"order" + index}>
                  <td className="order-page-table__text">
                    <CategoryCheckOne />
                  </td>
                  {/* <td className="order-page-table__image">
                    <CategoryImg categoryImg={category.category_img} />
                  </td> */}
                  <td className="order-page-table__text order-page-table__order-id">
                    {order.order_id}
                  </td>
                  <td className="order-page-table__text order-page-table__order-name">
                    {order.order_buyer.order_name}
                  </td>
                  <td className="order-page-table__text order-page-table__order-phone">
                    {order.order_buyer.order_phone}
                  </td>
                  <td className="order-page-table__text order-page-table__order-process">
                    {order.order_process_info}
                  </td>
                  <td className="order-page-table__text order-page-table__order-cost">
                    {convertNumberToMoney(order.order_total_cost)}
                  </td>
                  <td className="order-page-table__text order-page-table__product-action">
                    <Link
                      className="order-page__btn-small order-page__btn-small-edit order-page-table__product-action-edit"
                      href={`/admin/products/edit/${order.orderId}`}>
                      <button className="order-page-table__product-action-edit-btn">
                        <span className="material-icons-round order-page__btn-icon">
                          edit
                        </span>
                      </button>
                    </Link>
                    <CategoryDeleteOne />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      {totalPages > 1 && <AdminPagination totalPages={totalPages} />}
    </main>
  );
}
