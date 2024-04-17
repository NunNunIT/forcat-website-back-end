interface ProductVariant {
  _id: string;
  variant_name: string;
  variant_slug: string;
  price: number;
  variant_imgs: string[];
  discount_id: string;
  discount_amount: number;
  is_available: boolean;
  in_stock: number;
}

export interface IBuyForm {
  product_id: string;
  product_name: string;
  product_slug: string;
  product_avg_rating: number;
  product_variants: ProductVariant[];
}

export interface ISliderImage {
  link: string;
  alt: string;
}

export interface IReview {
  review_id_hashed: string;
  product_variant_name: string;
  review_rating: number;
  user_info: {
    user_name: string;
    user_avt: string;
  };
  createdAt: string;
  review_imgs: [
    {
      link: string;
      alt: string;
    }
  ];
  review_video: [
    {
      link: string;
      alt: string;
    }
  ];
  review_context: string;
}
