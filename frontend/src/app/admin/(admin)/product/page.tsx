// import libs
import React from "react";
import Image from "next/image";

// import css
import "./page.css";

export default async function AdminProductPage() {
  return (
    <main className="product-page-container">
      <h2>Danh sách sản phẩm</h2>
      <section className="product-page-head">
        <div className="product-page-head__item product-page-head__item--left">
          <button
            className="product-page__btn product-page__btn-import"
            type="button">
            <span className="material-icons-round product-page__btn-icon">
              download
            </span>
            <span className="product-page__btn-text">Nhập</span>
          </button>
          <button
            className="product-page__btn product-page__btn-export"
            type="button">
            <span className="material-icons-round product-page__btn-icon">
              publish
            </span>
            <span className="product-page__btn-text">Xuất</span>
          </button>
        </div>
        <div className="product-page-head__item product-page-head__item--right">
          <button
            className="product-page__btn product-page__btn-add"
            type="button">
            <span className="material-icons-round product-page__btn-icon">
              add
            </span>
            <span className="product-page__btn-text">Thêm</span>
          </button>
          <button
            className="product-page__btn product-page__btn-delete"
            type="button">
            <span className="material-icons-round product-page__btn-icon">
              delete
            </span>
            <span className="product-page__btn-text">Xóa</span>
          </button>
          <button
            className="product-page__btn product-page__btn-update"
            type="button">
            <span className="material-icons-round product-page__btn-icon">
              update
            </span>
            <span className="product-page__btn-text">Cập nhật</span>
          </button>
        </div>
      </section>

      <section className="product-page-content">
        <div className="product-page-table-head">
          <div className="product-page-search">
            <input
              className="product-page-search__input"
              type="text"
              placeholder="Tìm sản phẩm"
            />
            <div className="product-page-search__icon">
              <span className="material-icons-round">search</span>
            </div>
          </div>

          <div className="product-page-pagination">
            <div className="product-page-pagination__item product-page-pagination__item-first">
              <span className="material-icons-round">navigate_before</span>
            </div>
            <div className="product-page-pagination__item">1</div>
            <div className="product-page-pagination__item">2</div>
            <div className="product-page-pagination__item product-page-pagination__item-dot">
              ...
            </div>
            <div className="product-page-pagination__item">5</div>
            <div className="product-page-pagination__item product-page-pagination__item-last">
              <span className="material-icons-round">navigate_next</span>
            </div>
          </div>
        </div>
        <table className="product-page-table">
          <tr className="product-page-table__row">
            <th className="product-page-table__title">
              <input className="product-page-table__checkbox" type="checkbox" />
            </th>
            <th className="product-page-table__title">Hình ảnh</th>
            <th className="product-page-table__title">Mã sản phẩm</th>
            <th className="product-page-table__title">Tên sản phẩm</th>
            <th className="product-page-table__title">Tồn kho</th>
            <th className="product-page-table__title">Doanh thu</th>
            <th className="product-page-table__title"></th>
          </tr>
          <tr className="product-page-table__row">
            <td className="product-page-table__text">
              <input className="product-page-table__checkbox" type="checkbox" />
            </td>
            <td className="product-page-table__image">
              <div className="product-page-table__img-div">
                <Image
                  className="product-page-table__img"
                  src="/imgs/test.png"
                  alt="tst"
                  fill={true}
                />
              </div>
            </td>
            <td className="product-page-table__text">#abc</td>
            <td className="product-page-table__text">San pham abc</td>
            <td className="product-page-table__text">100</td>
            <td className="product-page-table__text">100.000.000đ</td>
            <td className="product-page-table__text">
              <span className="material-icons-round product-page-table__action">
                more_horiz
              </span>
            </td>
          </tr>
        </table>
      </section>
    </main>
  );
}
