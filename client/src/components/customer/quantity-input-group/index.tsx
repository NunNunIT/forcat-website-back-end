"use client";

// import libs
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";

// import css
import styles from "./quantity-input-group.module.css";

// use css
const cx = classNames.bind(styles);

export default function CustomerQuantityInputGroup({
  initValue,
  takeQuantity,
  ...props
}: {
  initValue: IQuantityInputGroup;
  takeQuantity?: any;
}) {
  const [inputValue, setInputValue] = useState(initValue.defaultValue);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = +event.target.value;

    if (newValue >= initValue.minValue && newValue <= initValue.maxValue) {
      setInputValue(newValue);
    }
  };

  useEffect(() => {
    takeQuantity(inputValue);
  }, [inputValue]);

  const decreaseValue = () => {
    if (inputValue > initValue.minValue) setInputValue(+inputValue - 1);
  };

  const increaseValue = () => {
    if (inputValue < initValue.maxValue) setInputValue(+inputValue + 1);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.select();
  };

  return (
    <div className={cx("quantity-input-group")}>
      <button
        className={cx("quantity-input-group__btn-remove", "btn-quantity")}
        onClick={decreaseValue}>
        <span
          className={cx("material-icons-round", "quantity-input-group__icon")}>
          remove
        </span>
      </button>
      <input
        ref={inputRef}
        className={cx("quantity-input-group__input", "input-quantity")}
        type="number"
        onChange={handleValueChange}
        onClick={handleClick}
        min={initValue.minValue}
        max={initValue.maxValue}
        value={inputValue}
      />
      <button
        className={cx("quantity-input-group__btn-add", "btn-quantity")}
        onClick={increaseValue}>
        <span
          className={cx("material-icons-round", "quantity-input-group__icon")}>
          add
        </span>
      </button>
    </div>
  );
}
