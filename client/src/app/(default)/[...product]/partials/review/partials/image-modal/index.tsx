"use client";

// import libs
import classNames from "classnames/bind";
import Image from "next/image";

// import css
import styles from "./image-modal.module.css";

// import interfaces
import { ISliderImage } from "../../../../interfaces";

// use css
const cx = classNames.bind(styles);

export default function ProductImageModal({
  productImgs,
  isModalHidden,
  setIsModalHidden,
}: {
  productImgs?: ISliderImage[];
  isModalHidden: string;
  setIsModalHidden: any;
}) {
  const handleCloseModal = () => {
    if (isModalHidden == "block") {
      if (typeof window !== "undefined") {
        const body = window.document.body;
        body.style.overflow = "scroll";
      }
      setIsModalHidden("none");
    }
  };

  return (
    <div className={cx("image-modal")} style={{ display: isModalHidden }}>
      <div
        className={cx("image-modal-bg")}
        onClick={handleCloseModal}
        title="Nhấn để thoát"></div>
      <div className={cx("image-modal-container")}>
        <div
          className={cx("modal-close", "modal-btn", "modal-icon-div")}
          onClick={handleCloseModal}
          title="Nhấn để thoát">
          <span className={cx("material-icons-round", "modal-icon")}>
            close
          </span>
        </div>
        <div className={cx("modal-main")}>
          <div className={cx("modal-prev", "modal-icon-div")}>
            <span className={cx("material-icons-round", "modal-icon")}>
              arrow_back_ios
            </span>
          </div>
          <div className={cx("modal-next", "modal-icon-div")}>
            <span className={cx("material-icons-round", "modal-icon")}>
              arrow_forward_ios
            </span>
          </div>
          <div className={cx("modal-main-image-div")}>
            <Image
              className={cx("modal-main-image")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
        </div>
        <div className={cx("modal-thumbnails")}>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
          <div className={cx("modal-thumbnail-div")}>
            <Image
              className={cx("modal-thumbnail")}
              src="/imgs/test.png"
              alt="test"
              fill={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
