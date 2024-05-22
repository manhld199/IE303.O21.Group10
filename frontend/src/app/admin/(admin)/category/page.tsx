// import libs
import React from "react";
import Image from "next/image";

// import css
import "./page.css";

export default async function AdminOrderPage() {
  return (
    <section className="order-page-content">
      <h3>Danh sách đơn hàng</h3>
      <div className="order-page-table-head">
        <div className="order-page-search">
          <input
            className="order-page-search__input"
            type="text"
            placeholder="Tìm đơn hàng"
          />
          <div className="order-page-search__icon">
            <span className="material-icons-round">search</span>
          </div>
        </div>
      </div>
      <table className="order-page-table">
        <tr className="order-page-table__row">
          <th className="order-page-table__title">
            <input className="order-page-table__checkbox" type="checkbox" />
          </th>
          <th className="order-page-table__title">Mã đơn hàng</th>
          <th className="order-page-table__title">Số điện thoại</th>
          <th className="order-page-table__title">Tên khách hàng</th>
          <th className="order-page-table__title">Ngày tạo</th>
          <th className="order-page-table__title">Trạng thái</th>
          <th className="order-page-table__title">Tổng tiền</th>
        </tr>

        <tr className="order-page-table__row">
          <td className="order-page-table__text">
            <input className="order-page-table__checkbox" type="checkbox" />
          </td>
          <td className="order-page-table__text">#abc</td>
          <td className="order-page-table__text">0987654321</td>
          <td className="order-page-table__text">Khach hang abc</td>
          <td className="order-page-table__text">1/1/2024</td>
          <td className="order-page-table__text">Chờ giao hàng</td>
          <td className="order-page-table__text">
            <strong>7.000.000đ</strong>
          </td>
        </tr>
        <tr className="order-page-table__row">
          <td className="order-page-table__text">
            <input className="order-page-table__checkbox" type="checkbox" />
          </td>
          <td className="order-page-table__text">#abc</td>
          <td className="order-page-table__text">0987654321</td>
          <td className="order-page-table__text">Khach hang abc</td>
          <td className="order-page-table__text">1/1/2024</td>
          <td className="order-page-table__text">Chờ giao hàng</td>
          <td className="order-page-table__text">
            <strong>7.000.000đ</strong>
          </td>
        </tr>
      </table>

      <div className="order-page--bottom">
        <p>1-15 trong số 50 đơn hàng</p>
        <div className="order-page-pagination">
          <div className="order-page-pagination__item order-page-pagination__item-first">
            <span className="material-icons-round">navigate_before</span>
          </div>
          <div className="order-page-pagination__item">1</div>
          <div className="order-page-pagination__item">2</div>
          <div className="order-page-pagination__item order-page-pagination__item-dot">
            ...
          </div>
          <div className="order-page-pagination__item">5</div>
          <div className="order-page-pagination__item order-page-pagination__item-last">
            <span className="material-icons-round">navigate_next</span>
          </div>
        </div>
      </div>
    </section>
  );
}
