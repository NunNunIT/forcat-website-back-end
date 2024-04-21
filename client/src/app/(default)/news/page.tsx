// import libs
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// import partials, components
import { CustomerNewsItem } from "./partials";
import { CustomerPagination } from "@/components";

// import utils
import { BACKEND_URL_NEWS } from "@/utils/commonConst";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Khám phá tin tức mới nhất về thế giới thú cưng tại ForCat Shop. Chúng tôi cập nhật những thông tin hữu ích về cách chăm sóc, nuôi dưỡng và yêu thương thú cưng của bạn. Duyệt qua bài viết về các sản phẩm mới, những mẹo hữu ích và các sự kiện đặc biệt. ForCat Shop luôn đồng hành cùng bạn trong hành trình chăm sóc và tạo niềm vui cho thú cưng của bạn!",
};

const getFullBackendArticleUrl = (page: string, limit: string): string => {
  return `${BACKEND_URL_NEWS}?page=${page}&limit=${limit}`;
}

interface IResponseNews {
  articles: INewsItemProps[];
  maxPage: number;
}

const fetcher = async (url: string) => {
  const res: Response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const json: IResponseJSON = await res.json();
  return json.data as IResponseNews;
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const page = searchParams?.page ?? "1";
  const limit = searchParams?.limit ?? "2";
  const fullURL: string = getFullBackendArticleUrl(page, limit);
  const data: IResponseNews = await fetcher(fullURL);

  return (
    <main className="news-page__container">
      <h1>Tin tức</h1>
      <section className="news__group-news-item">
        {data.articles.map((articleData: INewsItemProps) => (
          <CustomerNewsItem
            key={articleData.article_id_hashed}
            {...articleData}
          />
        ))}
      </section>
      <aside className="news__group-banner">
        <div className="news__banner-container">
          <Image
            src="/imgs/banner/banner.webp"
            alt="The first banner in news-page"
            fill
          />
        </div>
      </aside>
      <CustomerPagination className="news__pagination" maxPage={data.maxPage} />
    </main>
  );
}
