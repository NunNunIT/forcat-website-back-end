"use client";

// import libs
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useState, useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import useSWR from "swr";

// import utils
import { convertMoneyToNumber, convertNumberToMoney } from "@/utils";
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import "./page.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
let checkboxes, cartItem;
const userId = "661705fe7c6da785f2af9814";

export default function CartPage() {
  const { data, error, isLoading } = useSWR(
    `${BACKEND_URL}/cart/661705fe7c6da785f2af9814`,
    fetcher
  );
  const cart = data?.data.cartInfo;

  // handle change page
  const handleChangePage = (event) => {
    const changedItems = store.getState().cart.changedItems;
    const deletedItems = store.getState().cart.deletedItems;

    fetch(`${BACKEND_URL}/cart/updateCart/${userId}`, {
      body: JSON.stringify({ changedItems, deletedItems }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleChangePage);
  }, []);

  // handle checkbox
  const checkAll = useRef(null);

  useEffect(() => {
    checkboxes = Array.from(
      window?.document.querySelectorAll(".cart-checkbox")
    );
    cartItem = Array.from(window.document.querySelectorAll(".cart-item")).slice(
      1
    );
  }, [data]);

  // handle prices
  const [originalPrice, setOriginalPrice] = useState("0 đ");
  const [discountedPrice, setDiscountedPrice] = useState("0 đ");
  const [totalPrice, setTotalPrice] = useState("0 đ");

  // handle count
  const [selectedItem, setSelectedItem] = useState(0);
  const [allItem, setAllItem] = useState(0);

  useEffect(() => {
    setAllItem(cartItem.length);
  }, [cartItem]);

  // calc prices
  const calcPrices = () => {
    let original = 0;
    let total = 0;
    let discounted = 0;

    cartItem?.forEach((item: any) => {
      if ((item.querySelector(".cart-checkbox") as HTMLInputElement).checked) {
        const unit = item.querySelector(
          ".cart-item__unit-price-after-discount"
        );
        const u = convertMoneyToNumber(unit.innerHTML);

        const del = item.querySelector(
          ".cart-item__unit-price-before-discount del"
        );
        const o = convertMoneyToNumber(
          del != null ? del.innerHTML : unit.innerHTML
        );

        const inputEle = item.querySelector(".quantity-input-group__input");
        if (!inputEle.value) inputEle.value = inputEle.placeholder;

        const q = Number(inputEle.value);

        original += o * q;
        total += u * q;
        discounted += o * q - u * q;
      }
    });

    setOriginalPrice(convertNumberToMoney(original));
    setDiscountedPrice(convertNumberToMoney(discounted));
    setTotalPrice(convertNumberToMoney(total));
  };

  // click check all
  const handleCheckAll = () => {
    checkboxes.forEach(
      (checkbox: any) => (checkbox.checked = checkAll.current.checked)
    );

    countSelectedItem();
    calcPrices();
  };

  const handleCheckAllFooter = () => {
    checkboxes[0].checked = !checkboxes[0].checked;
  };

  // click check one
  const handleCheckOne = (event) => {
    // set checkall to false when 1 is not checked
    if (event.currentTarget.checked == false) checkAll.current.checked = false;

    // set checkall to true when every checkbox is checked
    if (
      event.currentTarget.checked == true &&
      checkboxes.slice(1).every((checkbox: any) => checkbox.checked)
    )
      checkAll.current.checked = true;

    countSelectedItem();
    calcPrices();
  };

  // count item
  const countSelectedItem = () => {
    const selected = cartItem.filter(
      (item: any) => item.querySelector(".cart-checkbox").checked
    );
    setSelectedItem(selected.length);
  };

  // delete cart item
  const handleDeleteCartItem = (event) => {
    const current = event.currentTarget;
    const cartItem = current.parentElement;
    handleUpdateDeletedItem(cartItem);
    cartItem.remove();
    setAllItem(allItem - 1);
    calcPrices();
  };

  // Quantity input group
  // handle value change
  const handleChangeQuantity = (event) => {
    const inputEle = event.target;

    if (Number(inputEle.value) > 100) inputEle.value = 100;
    else if (Number(inputEle.value) < 1) inputEle.value = 1;

    calcProductPrice(Number(inputEle.value), inputEle.parentElement);

    const cartItem =
      event.currentTarget.parentElement.parentElement.parentElement;
    handleUpdateChangedItem(cartItem);
    calcPrices();
  };

  const decreaseValue = (event) => {
    const inputEle = event.currentTarget.nextElementSibling;

    if (!inputEle.value) inputEle.value = inputEle.placeholder;

    if (Number(inputEle.value) > 1) inputEle.value = Number(inputEle.value) - 1;

    calcProductPrice(Number(inputEle.value), inputEle.parentElement);

    const cartItem =
      event.currentTarget.parentElement.parentElement.parentElement;
    handleUpdateChangedItem(cartItem);
    calcPrices();
  };

  const increaseValue = (event) => {
    const inputEle = event.currentTarget.previousElementSibling;

    if (!inputEle.value) inputEle.value = inputEle.placeholder;

    if (Number(inputEle.value) < 100)
      inputEle.value = Number(inputEle.value) + 1;

    calcProductPrice(Number(inputEle.value), inputEle.parentElement);

    const cartItem =
      event.currentTarget.parentElement.parentElement.parentElement;
    handleUpdateChangedItem(cartItem);
    calcPrices();
  };

  // handle dispatch
  const handleUpdateChangedItem = (cartItem: any) => {
    const productId = cartItem.querySelector("input[name='product_id']").value;
    const variantId = cartItem.querySelector(
      ".cart-item__variant-select"
    ).value;
    const quantity = cartItem.querySelector(
      ".quantity-input-group__input"
    ).value;
    store.dispatch({
      type: "updateChangedItems",
      payload: {
        product_id: productId,
        variant_id: variantId,
        quantity: quantity,
      },
    });
  };

  const handleUpdateDeletedItem = (cartItem: any) => {
    const productId = cartItem.querySelector("input[name='product_id']").value;
    const variantId = cartItem.querySelector(
      ".cart-item__variant-select"
    ).value;
    store.dispatch({
      type: "updateDeletedItems",
      payload: {
        product_id: productId,
        variant_id: variantId,
      },
    });
  };

  // calc prices
  const calcProductPrice = (quantity: number, inputGroupEle) => {
    const current = inputGroupEle;
    const unitPrice = convertMoneyToNumber(
      current.parentElement.previousSibling.querySelector(
        ".cart-item__unit-price-after-discount"
      ).innerHTML
    );
    const totalProductPrice = current.parentElement.nextSibling;
    totalProductPrice.innerHTML = convertNumberToMoney(unitPrice * quantity);
  };

  // handle variant change
  const handleVariantChange = (event) => {
    const cartItemEle =
      event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;

    const totalEle = cartItemEle.querySelector(".cart-item__price");
    const unitPrice = convertMoneyToNumber(
      cartItemEle.querySelector(".cart-item__unit-price-after-discount")
        .innerHTML
    );

    const inputEle = cartItemEle.querySelector(".quantity-input-group__input");
    if (!inputEle.value) inputEle.value = inputEle.placeholder;
    const quantity = Number(inputEle.value);

    totalEle.innerHTML = convertNumberToMoney(unitPrice * quantity);

    handleUpdateChangedItem(cartItemEle);
    calcPrices();
  };

  const handleBuyItem = (event) => {
    // event.preventDefault();

    const selectedItems = cartItem.filter(
      (item) => item.querySelector(".cart-checkbox").checked
    );
    const buyList = [];
    selectedItems.forEach((item) => {
      const productId = item.querySelector("input[name='product_id']").value;
      const productName = item.querySelector(
        ".cart-item__text-info-name"
      ).innerHTML;
      const selectEle = item.querySelector(".cart-item__variant-select");
      const variantId = selectEle.value;
      const variantName = (
        Array.from(selectEle.querySelectorAll("option")).find(
          (item: any) => item.value == selectEle.value
        ) as HTMLElement
      ).innerHTML;
      const variantImageLink =
        item.querySelector(".cart-item__image").currentSrc;
      const variantImageAlt = item.querySelector(".cart-item__image").alt;
      const quantity = Number(
        item.querySelector(".quantity-input-group__input").value !== ""
          ? item.querySelector(".quantity-input-group__input").value
          : item.querySelector(".quantity-input-group__input").placeholder
      );
      const unitPrice = convertMoneyToNumber(
        item.querySelector(".cart-item__unit-price-after-discount").innerHTML
      );
      const discountAmount = Number(
        item.querySelector("input[name='discount_amount']").value
      );

      buyList.push({
        product_id: productId,
        product_name: productName,
        variant_id: variantId,
        variant_name: variantName,
        variant_image_link: variantImageLink,
        variant_image_alt: variantImageAlt,
        quantity: quantity,
        unit_price: unitPrice,
        discount_amount: discountAmount,
      });
    });

    store.dispatch({
      type: "addBuyItems",
      payload: buyList,
    });

    // console.log(store.getState().cart.buyItems);
  };

  return (
    <Provider store={store}>
      <main className="cart">
        <section className="cart-product-group">
          <div className="cart-product-group__title cart-item title">
            <div className="title__item title__check-all">
              <input
                type="checkbox"
                className="cart-checkbox"
                ref={checkAll}
                onClick={handleCheckAll}
              />
              <h4>
                Sản phẩm (<span className="checked-num">{allItem}</span>)
              </h4>
            </div>
            <div className="title__item">
              <h4>Đơn giá</h4>
            </div>
            <div className="title__item">
              <h4>Số lượng</h4>
            </div>
            <div className="title__item mobile-hidden">
              <h4>Thành tiền</h4>
            </div>
            <div className="title__item mobile-hidden"></div>
          </div>
          {cart?.map((cartItem, itemIndex) => {
            const currentVariantIndex =
              cartItem.product.product_variants.findIndex(
                (item) => item._id == cartItem.variant_id
              );
            return (
              <div className="cart-item" key={itemIndex}>
                <input
                  type="hidden"
                  name="product_id"
                  value={cartItem.product._id}
                />
                <div className="cart-item__info cart-item-col">
                  <input
                    type="checkbox"
                    className="cart-checkbox"
                    onChange={handleCheckOne}
                  />
                  <div className="cart-item__info-div">
                    <div className="cart-item__image-div">
                      <CldImage
                        className="cart-item__image"
                        src={cartItem.product.product_imgs[0].link}
                        alt={cartItem.product.product_imgs[0].alt}
                        fill={true}
                      />
                    </div>
                    <div className="cart-item__text-info cart-item-col">
                      <h5
                        className="cart-item__text-info-name"
                        style={{
                          whiteSpace:
                            cartItem.product.product_variants.length != 0
                              ? "nowrap"
                              : "wrap",
                        }}>
                        {cartItem.product.product_name}
                      </h5>
                      {cartItem.product.product_variants.length != 0 && (
                        <div className="cart-item__variant">
                          <input
                            type="hidden"
                            value={
                              cartItem.product.product_variants[
                                currentVariantIndex
                              ]._id
                            }
                          />
                          <select
                            className="cart-item__variant-select"
                            onChange={handleVariantChange}>
                            <option
                              className="cart-item__variant-name"
                              value={
                                cartItem.product.product_variants[
                                  currentVariantIndex
                                ]._id
                              }
                              key={0}>
                              {
                                cartItem.product.product_variants[
                                  currentVariantIndex
                                ].variant_name
                              }
                            </option>
                            {cartItem.product.product_variants.map(
                              (variant, variantIndex) => {
                                if (variant._id !== cartItem.variant_id)
                                  return (
                                    <option
                                      className="cart-item__variant-name"
                                      value={variant._id}
                                      key={variantIndex}>
                                      {variant.variant_name}
                                    </option>
                                  );
                              }
                            )}
                          </select>
                          <span className="material-icons-round cart-item__variant-icon">
                            keyboard_arrow_down
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="cart-item__unit-price cart-item-col">
                  <input
                    type="hidden"
                    name="discount_amount"
                    value={
                      cartItem.product.product_variants[currentVariantIndex]
                        .discount_amount
                    }
                  />
                  <div className="cart-item__unit-price-after-discount">
                    {convertNumberToMoney(
                      (cartItem.product.product_variants[currentVariantIndex]
                        .price *
                        (100 -
                          cartItem.product.product_variants[currentVariantIndex]
                            .discount_amount)) /
                        100
                    )}
                  </div>
                  {cartItem.product.product_variants[currentVariantIndex]
                    .discount_amount != 0 && (
                    <div className="cart-item__unit-price-before-discount">
                      <del>
                        {convertNumberToMoney(
                          cartItem.product.product_variants[currentVariantIndex]
                            .price
                        )}
                      </del>
                    </div>
                  )}
                </div>
                <div className="cart-item__quantity cart-item-col">
                  <div className="quantity-input-group">
                    <button
                      className="quantity-input-group__btn-remove btn-quantity"
                      onClick={decreaseValue}>
                      <span className="material-icons-round quantity-input-group__icon">
                        remove
                      </span>
                    </button>
                    <input
                      className="quantity-input-group__input input-quantity"
                      type="number"
                      onChange={handleChangeQuantity}
                      min={1}
                      max={100}
                      placeholder={cartItem.quantity}
                    />
                    <button
                      className="quantity-input-group__btn-add btn-quantity"
                      onClick={increaseValue}>
                      <span className="material-icons-round quantity-input-group__icon">
                        add
                      </span>
                    </button>
                  </div>
                </div>
                <div className="cart-item__price cart-item-col mobile-hidden">
                  {convertNumberToMoney(
                    ((cartItem.product.product_variants[currentVariantIndex]
                      .price *
                      (100 -
                        cartItem.product.product_variants[currentVariantIndex]
                          .discount_amount)) /
                      100) *
                      cartItem.quantity
                  )}
                </div>
                <div
                  className="cart-item__remove-btn cart-item-col mobile-hidden"
                  onClick={handleDeleteCartItem}>
                  <span className="material-icons-round">delete</span>
                </div>
              </div>
            );
          })}
        </section>

        <section className="cart-bill ipad-hidden">
          <div className="cart-bill-row">
            <div className="cart-bill-row__title">Giá gốc</div>
            <div className="cart-bill-row__content">{originalPrice}</div>
          </div>
          <div className="cart-bill-row">
            <div className="cart-bill-row__title">Giảm giá</div>
            <div className="cart-bill-row__content">{discountedPrice}</div>
          </div>
          <div className="cart-bill-row cart-bill__line"></div>
          <div className="cart-bill-row cart-bill__total-price">
            <div className="cart-bill-row__title">Tổng tiền</div>
            <div className="cart-bill-row__content">{totalPrice}</div>
          </div>
          <Link
            href="/order-information"
            className="cart-bill-row cart-bill__btn"
            onClick={handleBuyItem}>
            Mua hàng (<span className="checked-num">{selectedItem}</span>)
          </Link>
          <div className="cart-bill-row cart-bill-policy">
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
            <a className="cart-bill-policy__link" href="#">
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a className="cart-bill-policy__link" href="/privacy-policy">
              Chính sách bảo mật
            </a>{" "}
            của ForCat.
          </div>
        </section>

        <section className="cart-bill-footer desktop-hidden ipad-display">
          <div className="cart-footer-container">
            <div className="cart-footer-btns">
              <div
                className="cart-footer-btns__check-all-btn cart-footer-btns__btn"
                onClick={() => {
                  handleCheckAllFooter();
                  handleCheckAll();
                }}>
                Tất cả (<span className="checked-num">{allItem}</span>)
              </div>
              <div className="cart-footer-btn__delete-btn cart-footer-btns__btn">
                Xóa
              </div>
            </div>
            <div className="cart-footer-buy-group">
              <div className="cart-footer-buy-group__pricing">
                <div className="pricing__total-price pricing__text">
                  Tổng tiền:{" "}
                  <del className="pricing__price-before-discount">
                    {originalPrice}
                  </del>
                </div>
                <div className="pricing__price-after-discount pricing__text">
                  {totalPrice}
                </div>
              </div>
              <Link
                href="/order-information"
                className="cart-footer-buy-group__buy-btn"
                onClick={handleBuyItem}>
                Mua hàng (<span className="checked-num">{selectedItem}</span>)
              </Link>
            </div>
          </div>
          <div className="cart-footer-policy">
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với Điều khoản dịch vụ,
            Chính sách thu thập và xử lý dữ liệu cá nhân của ForCat.
          </div>
        </section>
      </main>
    </Provider>
  );
}
