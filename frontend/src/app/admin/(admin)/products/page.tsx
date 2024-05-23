// import libs
import React from "react";
import Link from "next/link";

// import components
import { AdminPagination } from "@/components";
import { ProductImg } from "./components";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";
import { convertNumberToMoney } from "@/utils";

// import css
import "./page.css";

const getAllProducts = async (qery: String, page: String) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/admin/products/getProducts?q=${qery}&p=${page}`,
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
  const data = await getAllProducts(q, p);

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 0;

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
          <Link
            href="/admin/products/add"
            className="product-page__btn product-page__btn-add"
            type="button">
            <span className="material-icons-round product-page__btn-icon">
              add
            </span>
            <span className="product-page__btn-text">Thêm</span>
          </Link>
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
          <form className="product-page-search">
            <input
              className="product-page-search__input"
              type="text"
              name="q"
              placeholder={q ? q : "Tìm sản phẩm"}
            />
            <button className="product-page-search__icon" type="submit">
              <span className="material-icons-round">search</span>
            </button>
          </form>

          {totalPages > 1 && (
            <AdminPagination page={p} totalPages={totalPages} />
          )}
        </div>
        <table className="product-page-table">
          <thead>
            <tr className="product-page-table__row">
              <th className="product-page-table__title">
                <input
                  className="product-page-table__checkbox"
                  type="checkbox"
                />
              </th>
              <th className="product-page-table__title">Hình ảnh</th>
              <th className="product-page-table__title">Mã sản phẩm</th>
              <th className="product-page-table__title">Tên sản phẩm</th>
              <th className="product-page-table__title">Giá gốc</th>
              <th className="product-page-table__title">Danh mục</th>
              <th className="product-page-table__title">Biến thể</th>
              <th className="product-page-table__title"></th>
            </tr>
          </thead>

          <tbody>
            {products &&
              products.map((product, index) => (
                <tr className="product-page-table__row" key={"product" + index}>
                  <td className="product-page-table__text">
                    <input
                      className="product-page-table__checkbox"
                      type="checkbox"
                    />
                  </td>
                  <td className="product-page-table__image">
                    <ProductImg productImg={product.product_img} />
                  </td>
                  <td className="product-page-table__text product-page-table__product-id">
                    #{product.product_id}
                  </td>
                  <td className="product-page-table__text product-page-table__product-name">
                    {product.product_name}
                  </td>
                  <td className="product-page-table__text product-page-table__product-price">
                    {convertNumberToMoney(product.product_supp_price)}
                  </td>
                  <td className="product-page-table__text product-page-table__product-category">
                    {product.product_categories}
                  </td>
                  <td className="product-page-table__text product-page-table__product-variants">
                    {product.product_variants_count}
                  </td>
                  <td className="product-page-table__text">
                    <span className="material-icons-round product-page-table__action">
                      more_horiz
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
