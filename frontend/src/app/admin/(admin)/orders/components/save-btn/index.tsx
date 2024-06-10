"use client";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";

const deleteProducts = async () => {
  try {
    const deletedProducts = JSON.parse(
      localStorage.getItem("adminDeleteItems")
    ) ?? { payload: [] };

    if (Date.now() - deletedProducts?.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("adminDeleteItems");
    }

    const productIds = deletedProducts?.payload.join(",");
    // console.log(productIds);

    if (productIds)
      await fetch(
        `${BACKEND_URL}/admin/products/deleteProducts?pid=${productIds}`,
        {
          method: "POST",
        }
      );

    localStorage.removeItem("adminDeleteItems");
    // console.log(deletedProducts);
  } catch (err) {
    console.log(err);
    localStorage.removeItem("adminDeleteItems");
  }
};

export default function ProductDeleteMulti() {
  return (
    <button
      className="order-page__btn order-page__save-btn"
      type="button"
      onClick={deleteProducts}>
      <span className="material-icons-round order-page__btn-icon">save</span>
      <span className="order-page__btn-text">Lưu thay đổi</span>
    </button>
  );
}
