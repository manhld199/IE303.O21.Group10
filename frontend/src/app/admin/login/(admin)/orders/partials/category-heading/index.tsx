import Link from "next/link";
import "./style.css";

export default function CategoryHeading() {
  return (
    <Link href="/admin/categories" className="category-heading-link">
      <h2 className="category-heading">QUẢN LÝ ĐƠN HÀNG</h2>
    </Link>
  );
}
