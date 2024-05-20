// import libs
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// import partials
import {
  ProductSlider,
  ProductBuyForm,
  ProductDescription,
  ProductSpecification,
} from "./partials";

import { CustomerCarouselSlider } from "@/components";
// import utils
import { BACKEND_URL } from "@/utils/commonConst";

// import interfaces
import { IBuyForm } from "./interfaces";

// import css
import "./page.css";

// fetch data
async function getProduct(slug, pid) {
  try {
    const res = await fetch(`${BACKEND_URL}/products/getProduct/${pid}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok || slug[2]) return notFound();

    const data = res.json();

    return data;
  } catch (err) {
    console.log(err);
    return notFound();
  }
}

// fetch data
async function getRelatedProducts(slug, pid) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/products/getRelatedProducts/${pid}`,
      {
        next: { revalidate: 60 },
      }
    );

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: { product: string };
    searchParams?: { [key: string]: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.product;
  const { pid } = searchParams;
  const res = await getProduct(slug, pid);

  return {
    title: res.product_name,
    description: res.product_short_description,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { product: string };
  searchParams?: { [key: string]: string };
}) {
  const slug = params.product;
  const { pid } = searchParams;

  const product = await getProduct(slug, pid);
  // console.log(product);

  const relatedProducts = await getRelatedProducts(slug, pid);
  // console.log(relatedProducts);

  const productInfo: IBuyForm = {
    product_id: product.product_id,
    product_name: product.product_name,
    product_slug: product.product_slug,
    product_variants: product.product_variants,
  };

  const productImgs = product.product_imgs;
  const productDetails = product.product_details;
  const productDescription = product.product_description;

  return (
    <main className="product">
      <div className="product-content">
        <div className="product-content--left product-content-left">
          <ProductSlider
            productImgs={productImgs}
            desktopOnly="desktop-hidden tablet-display"
            tabletOnly="tablet-hidden"></ProductSlider>
          <ProductBuyForm
            pid={pid}
            productInfo={productInfo}
            currentVariantSlug={slug[1] ?? ""}
            desktopOnly="desktop-hidden"
            mobileOnly="mobile-display"></ProductBuyForm>
          <ProductSpecification
            productDetails={productDetails}></ProductSpecification>
          <ProductDescription
            productDescription={productDescription}
            desktopOnly="desktop-hidden mobile-display"></ProductDescription>
        </div>

        <div className="product-content--right product-content-right mobile-hidden">
          <div className="decoration-div">
            <Image
              className="decoration-img"
              src={`/imgs/product-page/decoration-${Math.floor(
                Math.random() * 5
              )}.webp`}
              alt="Trang trí"
              fill={true}
            />
          </div>
          <ProductBuyForm
            pid={pid}
            productInfo={productInfo}
            currentVariantSlug={slug[1] ?? ""}></ProductBuyForm>
          <ProductDescription
            productDescription={productDescription}></ProductDescription>
        </div>
      </div>
      <div className="related-container">
        <h2 className="tip-products__label">Xem các sản phẩm gợi ý khác</h2>
        <CustomerCarouselSlider productList={relatedProducts} />
      </div>
    </main>
  );
}
