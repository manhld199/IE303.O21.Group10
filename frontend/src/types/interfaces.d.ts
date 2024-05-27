interface IVariant {
  id: string;
  name: string;
  url: string;
  image: {
    url: string;
    alt: string;
  };
}

interface IQuantityInputGroup {
  defaultValue: number;
  minValue: number;
  maxValue: number;
}

interface IStarRatingProps {
  rating: number;
  className?: string;
}

interface ILogoProps {
  className?: string;
  white?: boolean;
}

interface IProductProps {
  product_id_hashed: string;
  product_name: string;
  product_slug: string;
  product_avg_rating: number;
  product_img: {
    url: string;
    alt: string;
  };
  lowest_price?: number;
  product_price: number;
  highest_discount?: number;
  price__discount?: number;
  product_sold_quantity?: number;
  category_name: string;
}

interface ISubCategoryProps {
  // _id: string;
  category_name: string;
  category_img: string;
  products: IProductProps[];
}

interface ICategoryTypeProps {
  // id: string;
  category_type: string;
  subCategories: ISubCategoryProps[];
}

interface IHeaderLinkProps {
  title: string;
  url: string;
  iconData?: string;
  className?: string;
  children?: React.ReactNode;
}

interface IHeaderMenuProps {
  categoryTypes: ICategoryTypeProps[];
  links: IHeaderLinkProps[];
}

interface IHeaderMenuProductItemProps {
  product_id_hashed: string;
  product_name: string;
  product_slug: string;
  product_avg_rating: number;
  product_img: {
    link: string;
    alt: string;
  };
  lowest_price?: number;
  product_price: number;
  highest_discount?: number;
  category_name: string;
}

interface IHeaderMenuSubCategoryItemProps {
  category_name: string;
  category_img: string;
  products: IProductProps[];
}

interface IHeaderMenuCategoryItemProps {
  categoryType: string;
  url?: string;
  iconData?: string;
  children?: React.ReactNode;
}

interface ICategoryCardProps {
  name: string;
  url: string;
  description?: string;
}

interface ISliderCardProps {
  url: string;
  description: string;
}

interface IRating {
  fontSize: TRating;
  rating: number;
}

interface IArticleDescriptionContentPRops {
  type: string;
  content: string;
}

interface IArticleDescriptionMediaPRops {
  type: string;
  url: string;
  alt: string;
  caption: string;
}

interface INewsItemProps {
  article_id: string;
  article_slug: string;
  article_title: string;
  article_subtitle: string;
  article_avt: {
    url: string;
    alt: string;
  };
  article_type: string;
  article_short_description: string;
  article_author: string;
  article_published_date: string;
}

interface IProductItemInOrderItemProps {
  product_id_hashed: string;
  product_name?: string;
  product_slug?: string;
  variant_id?: string;
  variant_name?: string;
  product_img?: {
    link: string;
    alt: string;
  };
  product_quantity: number;
  unit_price?: number;
  price_discount?: number;
  product_price: number;
}

interface IOrderItemProps {
  _id: string;
  order_status: string;
  order_details: IProductItemInOrderItemProps[];
  order_total_cost: number;
  mutate?: () => void;
}

interface INotiItemProps {
  _id: string;
  notification_name: string;
  notification_slug: string;
  notification_type: string;
  notification_description: string;
  updatedAt: string;
  is_unread: boolean;
  readAll?: boolean;
  mutate?: any;
  fetcherSetRead?: (url: string) => void;
}

interface IResponseJSON {
  status: number;
  success: boolean;
  message?: string;
  data?: Object;
}

interface IResponseNews {
  articles: INewsItemProps[];
}

interface IReviewItem {
  product_id_hashed: string;
  product_name: string;
  product_slug: string;
  variant_name: string;
  variant_img: {
    url: string;
    alt: string;
  };
  quantity: number;
  unit_price: number;
  review_rating: number;
  review_context: string;
  order_id?: string;
}
