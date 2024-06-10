"use client";

const deleteCategories = () => {
  const categories = Array.from(
    document.querySelectorAll(".category-page-table__category")
  ).filter((category) => {
    const checkbox = category.querySelector(
      ".checkbox-checkone"
    ) as HTMLInputElement;
    return checkbox && checkbox.checked;
  });

  const categoryIds = categories
    .map((category) => category.getAttribute("data-id"))
    .filter((id) => id !== null);

  console.log(categoryIds);

  const categoryIdsLocal = JSON.parse(
    localStorage.getItem("adminDeleteItems")
  ) ?? { payload: [] };

  localStorage.removeItem("adminDeleteItems");
  localStorage.setItem(
    "adminDeleteItems",
    JSON.stringify({
      type: "adminDeleteItems",
      payload: [...categoryIdsLocal.payload, ...categoryIds],
      timestamp: Date.now(),
    })
  );

  categories.forEach((category) => category.remove());
};

export default function CategoryDeleteMulti() {
  return (
    <button
      className="category-page__btn category-page__btn-delete"
      type="button"
      onClick={deleteCategories}>
      <span className="material-icons-round category-page__btn-icon">
        delete
      </span>
      <span className="category-page__btn-text">Xóa</span>
    </button>
  );
}
