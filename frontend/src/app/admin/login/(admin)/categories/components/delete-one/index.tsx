"use client";

const deleteCategory = (event: any) => {
  const current = event.currentTarget;
  const category = current.parentElement.parentElement;

  const categoryIdEle = category.querySelector(
    ".category-page-table__category-id"
  ) as HTMLElement;
  const categoryId = categoryIdEle.innerHTML;
  console.log(categoryId);

  const categoryIdsLocal = JSON.parse(
    localStorage.getItem("adminDeleteItems")
  ) ?? { payload: [] };

  localStorage.removeItem("adminDeleteItems");
  localStorage.setItem(
    "adminDeleteItems",
    JSON.stringify({
      type: "adminDeleteItems",
      payload: [...categoryIdsLocal.payload, categoryId],
      timestamp: Date.now(),
    })
  );

  category.remove();
};

export default function CategoryDeleteOne() {
  return (
    <button
      className="category-page__btn-small category-page__btn-small-delete"
      type="button"
      onClick={deleteCategory}>
      <span className="material-icons-round category-page__btn-icon">
        delete
      </span>
    </button>
  );
}
