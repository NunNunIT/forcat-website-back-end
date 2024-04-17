// import libs
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

// import partials
import {
  ProductSlider,
  ProductBuyForm,
  ProductDescription,
  ProductSpecification,
  ProductReview,
} from "./partials";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";

// import interfaces
import { IBuyForm } from "./interfaces";

// import css
import "./page.css";

// fetch data
async function getProduct(slug, pid) {
  try {
    const res = await fetch(
      `${BACKEND_URL}/product/${encodeURIComponent(pid)}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok || slug[2]) return notFound();

    return res.json();
  } catch {
    return notFound();
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
    title: res.data.product.product_name,
    description: res.data.product.product_short_description,
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
  const res = await getProduct(slug, pid);
  const productInfo: IBuyForm = {
    product_id: res.data.product._id,
    product_name: res.data.product.product_name,
    product_slug: res.data.product.product_slug,
    product_avg_rating: res.data.product.product_avg_rating,
    product_variants: res.data.product.product_variants,
  };

  const productImgs = res.data.product.product_imgs;
  const productDetails = res.data.product.product_detail;
  const productDescription = res.data.product.product_description;
  const productReviews = res.data.product.recent_reviews;
  const productId = res.data.product._id;
  const reviewOverview = {
    total_review: res.data.product.review_count.reduce(
      (total, current) => total + current,
      0
    ),
    avg_rating: res.data.product.product_avg_rating,
    review_count: res.data.product.review_count,
    recent_images: res.data.product.recent_images,
    recent_videos: res.data.product.recent_videos,
  };

  return (
    <main className="product">
      <div className="product-content">
        <div className="product-content--left product-content-left">
          <ProductSlider
            productImgs={productImgs}
            mobileOnly="mobile-hidden"
            desktopOnly="desktop-hidden"></ProductSlider>
          <ProductBuyForm
            pid={pid}
            productInfo={productInfo}
            currentVariantSlug={slug[1] ?? ""}
            mobileOnly="desktop-hidden"></ProductBuyForm>
          <ProductSpecification
            productDetails={productDetails}></ProductSpecification>
          <ProductDescription
            productDescription={productDescription}
            mobileOnly="desktop-hidden"></ProductDescription>
        </div>

        <div className="product-content--right product-content-right mobile-hidden">
          <div className="decoration__bow">
            <Image
              src="/imgs/product-page/bow.webp"
              alt="This is a bow"
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
      <ProductReview
        reviewOverview={reviewOverview}
        productReviews={productReviews}
        productId={productId}></ProductReview>
    </main>
  );
}
