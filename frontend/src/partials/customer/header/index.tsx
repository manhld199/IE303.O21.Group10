// import libs
import classNames from "classnames/bind";

// import components
import {
  CustomerHeaderNav,
  CustomerHeaderMain,
  CustomerHeaderMenu,
} from "./partials";

// import constant
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import styles from "./header.module.css";

const cx = classNames.bind(styles);

const getCategoryProducts = async () => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/products/getCategoryProducts`,
      {
        next: { revalidate: 60 },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {}
};

const headerLinks = [
  {
    title: "Sản phẩm HOT",
    iconData: "local_fire_department",
    url: "/search?r=1",
    className: "menu__hot-product",
  },
  {
    title: "Khuyến mãi",
    iconData: "savings",
    url: "/search?d=1",
    className: "menu__promo",
  },
  {
    title: "Tin tức - Bài viết",
    iconData: "newspaper",
    url: "/articles",
    className: "menu__news",
  },
  {
    title: "Về chúng tôi",
    iconData: "domain",
    url: "/about-us",
    className: "menu__about-us",
  },
];

export default async function CustomerHeader() {
  const categoryProducts = await getCategoryProducts();

  return (
    <header className={cx("header")}>
      <CustomerHeaderNav />
      <div className={cx("header__container")}>
        <CustomerHeaderMain />
        <CustomerHeaderMenu
          categoryProducts={categoryProducts}
          links={headerLinks}
        />
      </div>
    </header>
  );
}
