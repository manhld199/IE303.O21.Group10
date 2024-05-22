"use client";

// use bind from classnames
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// use scss
import styles from "./styles.module.css";

const cx = classNames.bind(styles);

const appBarData = [
  {
    url: "/",
    iconData: "home",
    text: "Trang chủ",
  },
  {
    url: "/category",
    iconData: "category",
    text: "Danh mục",
  },
  {
    url: "/news",
    iconData: "article",
    text: "Tin tức",
  },
  {
    url: "/search/results?hotProduct=true",
    iconData: "local_fire_department",
    text: "HOT",
  },
  {
    url: "/account/mobile-account",
    iconData: "account_circle",
    text: "Tài khoản",
  },
];

export default function AdminSideBar(props: ILogoProps) {
  const pathName = usePathname();
  return (
    <aside id="admin-sidebar" className={cx("admin-sidebar")}>
      <div className={cx("admin-sidebar__header")}>
        <div className={cx("admin__logo-wrapper")}>
          <Image
            className={cx("logo__img")}
            src={`/logo${props.white ? "-white" : "-brown"}.webp`}
            alt="Logo"
            fill
          />
        </div>
        <span className="material-icons-round" id="close-sidebar">
          close
        </span>
      </div>

      <div className={cx("admin-sidebar__content")}>
        <div className={cx("admin-sidebar__profile")}>
          <img
            className={cx("profile__img")}
            src="/imgs/test.png"
            alt="avt_admin"
          />
          {/* <h4>Admin <%= admin.admin_name %></h4> */}
          {/* <small><%= admin.admin_role %></small> */}
        </div>

        <div className={cx("admin-sidebar__list")}>
          <div className={cx("admin-sidebar__list-item")}>
            <a href="/admin/dasboard" className={cx("active")}>
              <span className={"material-icons-round"}>space_dashboard</span>
              <p>Dashboard</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/admin/categories_admin">
              <span className={"material-icons-round"}>category</span>
              <p>Danh mục</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/admin/products">
              <span className="material-icons-round">inventory_2</span>
              <p>Sản phẩm</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/feature_development">
              <span className="material-icons-round">shopping_bag</span>
              <p>Đơn hàng</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/feature_development">
              <span className="material-icons-round">groups</span>
              <p>Khách hàng</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/feature_development">
              <span className="material-icons-round">rate_review</span>
              <p>Đánh giá</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/feature_development">
              <span className="material-icons-round">warehouse</span>
              <p>Kho</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/feature_development">
              <span className="material-icons-round">bar_chart</span>
              <p>Báo cáo</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/feature_development">
              <span className="material-icons-round">settings</span>
              <p>Cài đặt</p>
            </a>
          </div>

          <div className={cx("admin-sidebar__list-item")}>
            <a href="/admin/logout">
              <span className="material-icons-round">logout</span>
              <p>Đăng xuất</p>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
