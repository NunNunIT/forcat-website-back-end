// import libs
import classNames from "classnames/bind";

// import css
import styles from "./modal.module.css";

const cx = classNames.bind(styles);

export default function Modal({
  children,
  onClose,
}: {
  onClose: (isShow: boolean) => void;
  children?: React.ReactNode;
}) {
  const handleOnClose = () => {
    onClose(false);
  };

  return (
    <div className={cx("modal")} onClick={handleOnClose}>
      <div
        className={cx("modal__container")}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`btn_ ${cx("modal__close")}`}
          onClick={handleOnClose}>
          <span className={"material-icons"}>close</span>
        </button>
        {children}
      </div>
    </div>
  );
}
