//import libs
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// import global components
import { CustomerCarouselSlider } from "@/components";
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
    "Chào mừng bạn đến với ForCat Shop - nơi mang lại những trải nghiệm tuyệt vời cho bạn và thú cưng của bạn. Tại đây, chúng tôi cam kết cung cấp những sản phẩm chất lượng và dịch vụ tận tâm nhất để giúp bạn chăm sóc và yêu thương thú cưng của mình. Khám phá ngay bộ sưu tập sản phẩm đa dạng và đăng ký tài khoản để nhận ưu đãi đặc biệt. Hãy bắt đầu hành trình mua sắm và chăm sóc thú cưng của bạn tại ForCat Shop ngay hôm nay!",
};

const fetchNewestProducts = async () => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/productList/getNewestProducts`,
      {
        next: { revalidate: 60 },
      }
    );

    // if (!response.ok) {
    //   throw new Error("Failed to fetch newest products");
    // }

    const data = await response.json();
    return data.data; // Return the entire data object
  } catch (error) {
    // console.error("Error fetching newest products:", error);
    // throw error;
  }
};

const fetchDiscountProducts = async () => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/productList/getDiscountProducts`,
      {
        next: { revalidate: 60 },
      }
    );

    // if (!response.ok) {
    //   throw new Error("Failed to fetch discount products");
    // }

    const data = await response.json();
    return data.data; // Return the entire data object
  } catch (error) {
    // console.error("Error fetching discount products:", error);
    // throw error;
  }
};

export default async function Home() {
  let newestProducts = await fetchNewestProducts();
  let discountProducts = await fetchDiscountProducts();
  return (
    <>
      <CustomerHeader />
      <main className="main-container">
        <CustomerSlider />
        <div className="content-container">
          <h1 className="tip-products__label">
            <Link href="/search-result" className="tip-products__title">
              Danh mục
            </Link>
            <span className="tip-products__title-after"></span>
          </h1>
          <CustomerCategories></CustomerCategories>
        </div>
        <div className="wrapper color">
          <div className="content-container">
            <h1 className="tip-products__label">
              <Link href="/search-result" className="tip-products__title">
                Gợi ý hôm nay
              </Link>
              <span className="tip-products__title-after"></span>
            </h1>
            <CustomerCarouselSlider />
          </div>
        </div>

        <section className="content-container tip-products-wrapper wrapper--white">
          <div className="tip-products">
            <h1 className="tip-products__label">
              <Link href="/search-result" className="tip-products__title">
                Hàng mới về
              </Link>
              <span className="tip-products__title-after"></span>
            </h1>
            <div className="tip-products__content">
              {newestProducts &&
                newestProducts.length &&
                newestProducts.map((product) => (
                  <CustomerProductCard
                    key={product.product_id_hashed}
                    product={product}
                  />
                ))}
            </div>
          </div>
          <div className="banner-wrapper">
            <Link className="banner-img--half" href="#">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-small-4.png"
                alt="banner-info"
              />
            </Link>
            <Link className="banner-img--half" href="#">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-small-1.png"
                alt="banner-info"
              />
            </Link>
          </div>
          <div className="banner-wrapper">
            <Link className="banner-img--half" href="#">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-small-3.webp"
                alt="banner-info"
              />
            </Link>
            <Link className="banner-img--half" href="#">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-small-2.png"
                alt="banner-info"
              />
            </Link>
          </div>
          <div className="banner-wrapper">
            <Link className="banner-img--full" href="#">
              <Image
                className="banner-img"
                fill={true}
                src="/imgs/home-page/banner-1.png"
                alt="banner-info"
              />
            </Link>
          </div>

          <div className="tip-products">
            <h1 className="tip-products__label">
              <Link href="#" className="tip-products__title">
                Khuyến mãi hấp dẫn
              </Link>
              <span className="tip-products__title-after"></span>
            </h1>
            <div className="tip-products__content">
              {discountProducts &&
                discountProducts.length &&
                discountProducts.map((product) => (
                  <CustomerProductCard
                    key={product.product_id_hashed}
                    product={product}
                  />
                ))}
            </div>
          </div>
        </section>
      </main>
      <CustomerFooter />
      <CustomerAppBar />
    </>
  );
}
