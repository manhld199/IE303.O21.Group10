//import libs
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// import global components
import { CustomerCarouselSlider } from "@/components";
import { CustomerNewsCarouselSlider } from "@/components";
import { CustomerProductCard } from "@/components";
import { CustomerSlider } from "@/components";
import { CustomerCategories } from "@/components";
import { CustomerHeader, CustomerFooter, CustomerAppBar } from "@/partials";
import { BACKEND_URL } from "@/utils/commonConst";

// use css
import "./page.css";

export const metadata: Metadata = {
  title: "ForCat | Trang chủ",
  description:
    "Chào mừng bạn đến với ForCatShop - nơi mang lại những trải nghiệm tuyệt vời cho bạn và thú cưng của bạn. Tại đây, ForCat Shop cam kết cung cấp những sản phẩm chất lượng và dịch vụ tận tâm nhất để giúp bạn chăm sóc và yêu thương thú cưng của mình. Khám phá ngay bộ sưu tập sản phẩm đa dạng và đăng ký tài khoản để nhận ưu đãi đặc biệt. Hãy bắt đầu hành trình mua sắm và chăm sóc thú cưng của bạn tại ForCat Shop ngay hôm nay!",
};

const getRecommendedProducts = async () => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/products/getRecommendProducts`,
      {
        next: { revalidate: 3600 },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching recommend products:", error);
  }
};

const getNewestProducts = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/products/getNewestProducts`, {
      next: { revalidate: 60 },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching newest products:", error);
  }
};

const getDiscountedProducts = async () => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/products/getDiscountedProducts`,
      {
        next: { revalidate: 60 },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching discount products:", error);
  }
};

// interface IResponseNews {
//   articles: INewsItemProps[];
//   maxPage: number;
// }

const fetchArticles = async () => {
  const response = await fetch(
    `${BACKEND_URL}/articles/unlimited?page=1&limit=6`,
    {
      next: { revalidate: 60 },
    }
  );
  // if (!res.ok) return notFound();
  const json = await response.json();
  return json.data;
};

export default async function Home() {
  let recommendedProducts = await getRecommendedProducts();
  // console.log(recommendProducts);
  let newestProducts = await getNewestProducts();
  // console.log(newestProducts);

  let discountedProducts = await getDiscountedProducts();
  // console.log(discountedProducts);

  // let articles = await fetchArticles();

  return (
    <>
      <CustomerHeader />
      <main className="main-container">
        <CustomerSlider />
        <div className="content-container">
          <h2 className="tip-products__label">
            <span className="tip-products__title non-hover">Danh mục</span>
            <span className="tip-products__title-after"></span>
          </h2>
          <CustomerCategories />
        </div>

        <div className="wrapper color">
          <div className="content-container">
            <h2 className="tip-products__label">
              <Link
                href="/search-result?sortBy=hot"
                className="tip-products__title">
                Gợi ý hôm nay
                <p> Xem tất cả </p>
              </Link>
              <span className="tip-products__title-after"></span>
            </h2>
            <CustomerCarouselSlider productList={recommendedProducts} />
          </div>
        </div>

        <section className="content-container tip-products-wrapper wrapper--white">
          <div className="tip-products">
            <h2 className="tip-products__label">
              <Link
                href="/search-result?sortBy=new"
                className="tip-products__title">
                Hàng mới về
                <p> Xem tất cả </p>
              </Link>
              <span className="tip-products__title-after"></span>
            </h2>
            <div className="tip-products__content">
              {newestProducts &&
                newestProducts.length &&
                (newestProducts ?? []).map((product) => (
                  <CustomerProductCard
                    key={product.product_id}
                    product={product}
                  />
                ))}
            </div>
          </div>
          <div className="banner-wrapper">
            <Link
              className="banner-img--half"
              href="/search-result?searchKey=reflex">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-small-4.webp"
                alt="banner-info"
              />
            </Link>
            <Link
              className="banner-img--half"
              href="https://www.facebook.com/forcat.official"
              target="_blank">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-small-1.webp"
                alt="banner-info"
              />
            </Link>
          </div>
          <div className="banner-wrapper">
            <Link
              className="banner-img--half"
              href="https://www.facebook.com/lawsforpawsvietnam"
              target="_blank">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-small-3.webp"
                alt="banner-info"
              />
            </Link>
            <Link className="banner-img--half" href="/about-us">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-small-2.webp"
                alt="banner-info"
              />
            </Link>
          </div>
          <div className="banner-wrapper">
            <Link className="banner-img--full" href="/news">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-1.webp"
                alt="banner-info"
              />
            </Link>
          </div>

          <div className="tip-products">
            <h2 className="tip-products__label">
              <Link
                href="/search-result?discount=True"
                className="tip-products__title">
                Khuyến mãi hấp dẫn
                <p> Xem tất cả </p>
              </Link>
              <span className="tip-products__title-after"></span>
            </h2>
            <div className="tip-products__content">
              {discountedProducts &&
                discountedProducts.length &&
                (discountedProducts ?? []).map((product) => (
                  <CustomerProductCard
                    key={product.product_id}
                    product={product}
                  />
                ))}
            </div>
          </div>
        </section>
        {/* <div className="wrapper color padding-bottom">
          <div className="content-container">
            <h2 className="tip-products__label">
              <Link href="/news" className="tip-products__title">
                Tin tức hằng ngày
                <p> Xem tất cả </p>
              </Link>
              <span className="tip-products__title-after"></span>
            </h2>
            <CustomerNewsCarouselSlider newList={articles} />
          </div>
        </div> */}
      </main>
      <CustomerFooter />
      <CustomerAppBar />
    </>
  );
}
