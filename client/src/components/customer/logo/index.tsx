// import libs
import className from "classnames/bind";
import Link from "next/link";
import Image from "next/image";

// import css
import style from "./logo.module.css";

const cx = className.bind(style);

export default function CustomerLogo(props: ILogoProps) {
  const { className } = props;
  return (
    <Link href="/" className={cx("logo__container") + " " + className}>
      <Image
        className={cx("logo__img")}
        src={`/logo${props.white ? "-white" : "-brown"}.webp`}
        alt="Logo"
        fill
      />
    </Link>
  );
}
