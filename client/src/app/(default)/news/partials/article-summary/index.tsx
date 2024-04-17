// import libs
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";

// import utils
import { convertDateStrToDDMMYYYY } from "@/utils";

// import css
import styles from "./article-summary.module.css";

const cx = classNames.bind(styles);

export default function ArticleSummary(props: IArticleProps) {
  const {
    article_id,
    article_name,
    article_type,
    article_short_description,
    article_info,
    article_date,
  } = props;

  const articleDateConverted = convertDateStrToDDMMYYYY(
    article_info.published_date
  );

  return (
    <Link className={cx("article__link")} href={`news/${article_name}`}>
      <article className={cx("article__container")}>
        <div className={cx("article__content-container")}>
          <span className={cx("article__type")}>{article_type}</span>
          <h2 className={cx("article__name")}>{article_name}</h2>
          <div className={cx("article__info")}>
            <address>
              <span>
                Bởi:{" "}
                <strong className={cx("article__author")}>
                  {" "}
                  {article_info.author}
                </strong>
              </span>
              <time dateTime={article_date}>{articleDateConverted}</time>
            </address>
            <p className={cx("article__short-description")}>
              {article_short_description}
            </p>
          </div>
        </div>
        <div className={cx("article__cover-container")}>
          <Image
            src="/imgs/news_covers/article_1.png"
            alt={`Image cover of ${article_name}`}
            fill
          />
        </div>
      </article>
    </Link>
  );
}
