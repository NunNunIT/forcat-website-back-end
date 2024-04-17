"use client";

// import libs
import classNameNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

// import function from utils
import { parseNumToCurrencyStr } from "@/utils";

// import components
import { CustomerStarRating } from "@/components";

// import css
import styles from "./header-menu.module.css";

const cx = classNameNames.bind(styles);

function CustomerHeaderMenuProductItem(
  props: IHeaderMenuProductItemProps
): JSX.Element {
  const discountPrice = props.product_price;

  return (
    <Link
      className={cx("cate-dropdown__product-link")}
      href={`/${props.product_slug}?pid=${props.product_id_hashed}`}
      title={props.product_name}>
      <span className={cx("cate-dropdown__product-img-container")}>
        <CldImage
          src={props.product_img.link}
          alt={props.product_img.alt}
          fill
        />
      </span>
      <div className={cx("cate-dropdown__product-rating")}>
        <CustomerStarRating
          className={cx("cate-dropdown__product-star")}
          rating={props.product_avg_rating}
        />
        <span>({props.product_avg_rating})</span>
      </div>
      <span className={cx("cate-dropdown__product-name")}>
        {props.product_name}
      </span>
      <div>
        <span className={cx("cate-dropdown__product-price")}>
          {parseNumToCurrencyStr(discountPrice)} đ
        </span>{" "}
        {/* {price__discount && (
          <del className={cx("cate-dropdown__product-price--discount")}>
            {parseNumToCurrencyStr(price)}
          </del>
        )} */}
      </div>
    </Link>
  );
}

function CustomerHeaderMenuSubCategoryItem(
  props: IHeaderMenuSubCategoryItemProps
): JSX.Element {
  const { category_name, category_img, products } = props;
  const hasProducts: boolean = products?.length > 0;

  return (
    <li className={cx("cate-dropdown__wrapper")}>
      <Link
        className={cx("cate-dropdown__info")}
        href={`/search-result?searchKey=${props.category_name}`}>
        <span className={cx("cate-dropdown__img-container")}>
          <CldImage
            src={category_img}
            alt={`Hình đại cho phân loại${category_name} của ForCat Shop`}
            fill
          />
        </span>
        <span className={cx("cate-dropdown__sub-cate")}>{category_name}</span>{" "}
        <span>({products?.length ?? 0})</span>
      </Link>
      <div className={cx("cate-dropdown__content")}>
        <div className={cx("cate-dropdown__title")}>
          <span>Sản phẩm bán chạy nhất</span>
          <Link
            className={cx("cate-dropdown__title-link")}
            href={`/search-result?searchKey=${props.category_name}`}>
            <span>Xem tất cả</span>
            <span className="material-icons-outlined">chevron_right</span>
          </Link>
        </div>
        {hasProducts ? (
          <div className={cx("cate-dropdown__products")}>
            {products.map((product: IProductProps, index: number) => (
              <CustomerHeaderMenuProductItem key={index} {...product} />
            ))}
          </div>
        ) : (
          <div className={cx("cate-dropdown__products--not-found")}>
            <span
              className={cx(
                "cate-dropdown__products--not-found__img-container"
              )}>
              <Image
                src="/imgs/nothing-result.png"
                alt="Not found result"
                fill
              />
            </span>
            <span className={cx("cate-dropdown__products--not-found__text")}>
              Không tìm thấy sản phẩm!
            </span>
          </div>
        )}
      </div>
    </li>
  );
}

function CustomerHeaderMenuCategoryItem(
  props: IHeaderMenuCategoryItemProps
): JSX.Element {
  return (
    <li className={cx("menu__item")}>
      <div className={cx("menu__cate")}>
        <span className={cx("menu__item-p")}>{props.categoryType}</span>
        {props.children && (
          <span className="material-icons-outlined">expand_more</span>
        )}
      </div>
      {props.children}
    </li>
  );
}

export default function CustomerHeaderMenu(
  props: IHeaderMenuProps
): JSX.Element {
  return (
    <ul className={cx("header__menu")}>
      {props.categories.map((category: ICategoryProps, index: number) => (
        <CustomerHeaderMenuCategoryItem
          key={index}
          categoryType={category.category_type}
          {...category}>
          {category.subCategories && (
            <ul className={cx("menu__cate-dropdown")}>
              {category.subCategories.map(
                (subCategory: ISubCategoryProps, index: number) => (
                  <CustomerHeaderMenuSubCategoryItem
                    key={index}
                    {...subCategory}
                  />
                )
              )}
            </ul>
          )}
        </CustomerHeaderMenuCategoryItem>
      ))}

      {props.links.map((link: IHeaderLinkProps) => (
        <li key={link.title} className={cx("menu__item")}>
          <Link className={cx("menu__cate")} href={link.url}>
            <span className={cx("menu__item-p")}>{link.title}</span>
            {link.iconData && (
              <span className={"material-icons " + cx(link.className)}>
                {link.iconData}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
