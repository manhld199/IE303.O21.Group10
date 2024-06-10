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
import { cookies } from "next/headers";

const getAllCategories = async (
  query: String,
  page: String,
  userToken: any
) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/admin/categories/getAllCategories?q=${query}&p=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        next: { revalidate: 60 },
      }
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
  const cookieStore = cookies();
  const userToken = cookieStore.get("user-token")?.value;

  const data = await getAllCategories(q, p, userToken);

  const categories = data?.categories ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <main className="category-page-container">
      <h2 className="category-page-container__title">Danh sách danh mục</h2>
      <section className="category-page-head">
        <div className="category-page-head__item category-page-head__item--left">
          <button
            className="category-page__btn category-page__btn-import"
            type="button">
            <span className="material-icons-round category-page__btn-icon">
              download
            </span>
            <span className="category-page__btn-text">Nhập</span>
          </button>
          <button
            className="category-page__btn category-page__btn-export"
            type="button">
            <span className="material-icons-round category-page__btn-icon">
              publish
            </span>
            <span className="category-page__btn-text">Xuất</span>
          </button>
        </div>
        <div className="category-page-head__item category-page-head__item--right">
          <Link
            href="/admin/categories/add"
            className="category-page__btn category-page__btn-add"
            type="button">
            <span className="material-icons-round category-page__btn-icon">
              add
            </span>
            <span className="category-page__btn-text">Thêm</span>
          </Link>
          <CategoryDeleteMulti />
          <CategorySaveBtn />
        </div>
      </section>

      <section className="category-page-content">
        <div className="category-page-table-head">
          <form className="category-page-search">
            <input
              className="category-page-search__input"
              type="text"
              name="q"
              placeholder={q ? q : "Tìm danh mục"}
            />
            <button className="category-page-search__icon" type="submit">
              <span className="material-icons-round">search</span>
            </button>
          </form>

          {totalPages > 1 && <AdminPagination totalPages={totalPages} />}
        </div>
        <table className="category-page-table">
          <thead>
            <tr className="category-page-table__row">
              <th className="category-page-table__title">
                <CategoryCheckAll />
              </th>
              <th className="category-page-table__title">Hình ảnh</th>
              <th className="category-page-table__title">Mã danh mục</th>
              <th className="category-page-table__title">Tên danh mục</th>
              <th className="category-page-table__title">Mô tả</th>
              <th className="category-page-table__title">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {categories &&
              categories.map((category, index) => (
                <tr
                  className="category-page-table__row category-page-table__product"
                  key={"category" + index}>
                  <td className="category-page-table__text">
                    <CategoryCheckOne />
                  </td>
                  <td className="category-page-table__image">
                    <CategoryImg categoryImg={category.category_img} />
                  </td>
                  <td className="category-page-table__text category-page-table__category-id">
                    {category.category_id}
                  </td>
                  <td className="category-page-table__text category-page-table__category-name">
                    {category.category_name}
                  </td>
                  <td className="category-page-table__text category-page-table__category-category">
                    {category.category_short_description}
                  </td>
                  <td className="category-page-table__text category-page-table__category-action">
                    <Link
                      className="category-page__btn-small category-page__btn-small-edit category-page-table__category-action-edit"
                      href={`/admin/categories/edit/${category.category_id}`}>
                      <button className="category-page-table__category-action-edit-btn">
                        <span className="material-icons-round category-page__btn-icon">
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
