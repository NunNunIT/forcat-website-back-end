"use client";

// import libs
import classNames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// import components
import { CustomerQuantityInputGroup, CustomerRating } from "@/components";
import { ProductVariant } from "../../components";

// import utils
import {
  convertNumberToMoney,
  convertMoneyToNumber,
  createSlug,
} from "@/utils";
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import styles from "./buy-form.module.css";

// import interfaces
import { IBuyForm } from "../../interfaces";

// use css
const cx = classNames.bind(styles);

function filterCurrentVariant(productVariants, currentVariantSlug) {
  return productVariants.filter(
    (variant) =>
      createSlug(variant.variant_name) ==
      decodeURIComponent(createSlug(currentVariantSlug))
  )[0];
}

// handle change page
const handleChangePage = () => {
  const cartItem = store.getState().product.cartItem;
  const userId = "661705fe7c6da785f2af9814";

  fetch(`${BACKEND_URL}/cart/addCart/${userId}`, {
    body: JSON.stringify(cartItem),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default function ProductBuyForm({
  pid,
  productInfo,
  currentVariantSlug,
  mobileOnly,
  ...props
}: {
  pid: any;
  productInfo: IBuyForm;
  currentVariantSlug: string;
  mobileOnly?: string;
}) {
  const filteredVariant = filterCurrentVariant(
    productInfo.product_variants,
    currentVariantSlug
  );
  const currentVariant =
    currentVariantSlug == "" || !filteredVariant
      ? productInfo.product_variants[0]
      : filteredVariant;

  const [quantityValue, setQuantityValue] = useState(1);
  const [totalPrice, setTotalPrice] = useState(
    convertNumberToMoney(currentVariant?.price ?? 0)
  );
  const unitPriceRef = useRef(null);

  const handleQuantityChange = () => {
    const unitPrice = convertMoneyToNumber(unitPriceRef.current.innerHTML);
    const total = unitPrice * quantityValue;
    setTotalPrice(convertNumberToMoney(total));
  };

  useEffect(() => {
    handleQuantityChange();
  }, [quantityValue]);

  // handle buy
  const buyFormRef = useRef(null);
  const handleBuyItem = (event) => {
    const productId = productInfo.product_id;
    const productName = productInfo.product_name;
    const variantId = currentVariant._id;
    const variantName = currentVariant.variant_name;
    const variantImageLink = currentVariant.variant_imgs[0].link;
    const variantImageAlt = currentVariant.variant_imgs[0].alt;
    const quantity = Number(
      buyFormRef.current.querySelector(".quantity-input-group__input").value
    );
    const unitPrice = convertMoneyToNumber(unitPriceRef.current.innerHTML);

    store.dispatch({
      type: "addBuyItems",
      payload: [
        {
          product_id: productId,
          product_name: productName,
          variant_id: variantId,
          variant_name: variantName,
          variant_image_link: variantImageLink,
          variant_image_alt: variantImageAlt,
          quantity: quantity,
          unit_price: unitPrice,
          discount_amount: currentVariant.discount_amount,
        },
      ],
    });

    // console.log(store.getState().cart.buyItems);
  };

  const cartModalRef = useRef(null);
  const handleCloseModal = () => {
    const cartModal = cartModalRef.current;
    cartModal.classList.add("hidden");
  };

  // handle add cart
  const handleAddCart = () => {
    const productId = productInfo.product_id;
    const variantId = currentVariant._id;
    const quantity = Number(
      buyFormRef.current.querySelector(".quantity-input-group__input").value
    );

    store.dispatch({
      type: "addCartItem",
      payload: {
        product_id: productId,
        variant_id: variantId,
        quantity: quantity,
      },
    });

    const cartModal = cartModalRef.current;
    cartModal.classList.remove("hidden");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleChangePage);
  }, []);

  return (
    <Provider store={store}>
      <section
        className={cx("product-buy-form", "product", mobileOnly)}
        ref={buyFormRef}>
        <h1 className={cx("product__name")}>{productInfo.product_name}</h1>
        <div className={cx("product__rating", "rating")}>
          <span className={cx("rating__average")}>
            {productInfo.product_avg_rating}/5
          </span>
          <CustomerRating
            initValue={{
              fontSize: "24px",
              rating: productInfo.product_avg_rating,
            }}></CustomerRating>
        </div>
        <div className={cx("product__unit-price-div")}>
          <p className={cx("product__unit-price")} ref={unitPriceRef}>
            {convertNumberToMoney(currentVariant?.price ?? 0)}
          </p>
          {currentVariant?.discount_amount > 0 && (
            <p className={cx("product__discount-amount")}>
              -{currentVariant?.discount_amount}%
            </p>
          )}
        </div>
        <div className={cx("product__variants", "variants")}>
          <h3 className={cx("variants__title")}>Loại sản phẩm</h3>
          <div className={cx("variants__group")}>
            {productInfo.product_variants.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <ProductVariant
                    pid={pid}
                    variant={{
                      id: item._id,
                      name: item.variant_name,
                      url: `/${productInfo.product_slug}/${item.variant_slug}}`,
                      image: {
                        url: (item.variant_imgs[0] as any).link,
                        alt: (item.variant_imgs[0] as any).alt,
                      },
                    }}></ProductVariant>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className={cx("product__quantity")}>
          <h3>Số lượng</h3>
          <CustomerQuantityInputGroup
            initValue={{
              defaultValue: quantityValue,
              minValue: 1,
              maxValue: 100,
            }}
            takeQuantity={setQuantityValue}></CustomerQuantityInputGroup>
          <p className={cx("product__is-stock")}>
            {currentVariant?.in_stock ?? 0} sản phẩm có thể mua
          </p>
        </div>
        <div className={cx("product__total-price-div")}>
          <h3>Tạm tính</h3>
          <p className={cx("product__total-price")}>{totalPrice}</p>
        </div>
        <div className={cx("product__buy-btns", "buy-btns")}>
          <div
            className={cx("buy-btns__add-cart", "add-cart-btn", "buy-btn")}
            onClick={handleAddCart}>
            <span className={cx("material-icons-round", " buy-btn-icon")}>
              add_shopping_cart
            </span>
            <span className={cx("buy-btn-text")}>Giỏ hàng</span>
          </div>
          <div className={cx("cart-modal", "hidden")} ref={cartModalRef}>
            <div
              className={cx("cart-modal__bg")}
              title="Nhấn để thoát"
              onClick={handleCloseModal}></div>
            <div className={cx("cart-modal__content")}>
              <div
                className={cx("cart-modal-close", "modal-icon-div")}
                onClick={handleCloseModal}
                title="Nhấn để thoát">
                <span className={cx("material-icons-round", "modal-icon")}>
                  close
                </span>
              </div>
              <div className={cx("cart-modal__image-div")}>
                <Image
                  className={cx("cart-modal__image")}
                  src="/imgs/cart/add-cart-success.webp"
                  alt="Thêm vào giỏ hàng thành công"
                  fill={true}
                />
              </div>
              <h3>Sản phẩm đã được thêm vào giỏ hàng</h3>
            </div>
          </div>

          <Link
            href="/order-information"
            className={cx("buy-btns__buy-now", "buy-now-btn", "buy-btn")}
            onClick={handleBuyItem}>
            <span className={cx("material-icons-round", "buy-btn-icon")}>
              savings
            </span>
            <span className={cx("buy-btn-text")}>Mua ngay</span>
          </Link>
        </div>
      </section>
    </Provider>
  );
}
