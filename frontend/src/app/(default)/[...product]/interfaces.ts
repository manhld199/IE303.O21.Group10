interface ProductVariant {
  variant_id: string;
  variant_name: string;
  variant_slug: string;
  variant_price: number;
  variant_img: {
    url: string;
    alt: string;
  };
  variant_discount: {
    discount_id: string;
    discount_amount: number;
  };
  in_stock: number;
}

export interface IBuyForm {
  product_id: string;
  product_name: string;
  product_slug: string;
  product_variants: ProductVariant[];
}

export interface ISliderImage {
  url: string;
  alt: string;
}
