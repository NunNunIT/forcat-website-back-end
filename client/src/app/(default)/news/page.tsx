// import libs
import Image from "next/image";
import type { Metadata } from "next";

// import components
import { ArticleSummary } from "./partials";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Khám phá tin tức mới nhất về thế giới thú cưng tại ForCat Shop. Chúng tôi cập nhật những thông tin hữu ích về cách chăm sóc, nuôi dưỡng và yêu thương thú cưng của bạn. Duyệt qua bài viết về các sản phẩm mới, những mẹo hữu ích và các sự kiện đặc biệt. ForCat Shop luôn đồng hành cùng bạn trong hành trình chăm sóc và tạo niềm vui cho thú cưng của bạn!",
};

const articleData: IArticleProps = {
  article_id: "0",
  article_name: "Gel Dinh Dưỡng Cho Chó Mèo: Tìm Hiểu, Lựa Chọn & Sử Dụng",
  article_type: "Cách nuôi",
  article_short_description:
    "Gel dinh dưỡng cho chó mèo là một sản phẩm quan trọng trong việc bổ sung năng lượng, vitamin và khoáng chất cho thú cưng của bạn. Việc sử dụng …",
  article_info: {
    author: "Thú cưng",
    published_date: "01/04/2023",
  },
  article_date: "01/04/2024",
};

const articlesData: IArticleProps[] = [
  articleData,
  articleData,
  articleData,
  articleData,
  articleData,
  articleData,
  articleData,
  articleData,
  articleData,
  articleData,
];

export default function NewsPage() {
  return (
    <main>
      <h1>Tin tức</h1>
      <section className="news__group-article">
        {articlesData.map((articleData: IArticleProps) => (
          <ArticleSummary key={articleData.article_id} {...articleData} />
        ))}
      </section>
      <aside className="news__group-banner">
        <div className="news__banner-container">
          <Image
            src="/imgs/banner/banner_1.png"
            alt="The first banner in news-page"
            fill
          />
        </div>
        <div className="news__banner-container">
          <Image
            src="/imgs/banner/banner_2.png"
            alt="The second banner in news-page"
            fill
          />
        </div>
      </aside>
    </main>
  );
}
