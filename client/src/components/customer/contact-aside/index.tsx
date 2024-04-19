import Link from "next/link";
import Image from "next/image";

// import css
import "./style.css";

export default function ContactAside() {
  return (
    <div className="contact-aside__container">
      <ul className="contact-aside__list">
        <li className="contact-aside__item">
          <Link
            href="https://zalo.me/0979810730"
            target="blank"
            className="contact-aside__icon">
            <Image
              className="contact-aside__icon-img"
              fill={true}
              src="/imgs/contact-aside/zalo.webp"
              alt="Contact Zalo"></Image>
            <span className="contact-aside__tooltip-text">
              Zalo: ForCat Shop
            </span>
          </Link>
        </li>
        <li className="contact-aside__item">
          <Link
            href="https://www.facebook.com/forcat.official"
            target="blank"
            className="contact-aside__icon facebook">
            <Image
              className="contact-aside__icon-img facebook"
              fill={true}
              src="/imgs/contact-aside/facebook.webp"
              alt="Contact Facebook"></Image>
            <span className="contact-aside__tooltip-text">
              Facebook: ForCat Shop
            </span>
          </Link>
        </li>
        <li className="contact-aside__item">
          <Link href="tel: 0795849949" className="contact-aside__icon">
            <Image
              className="contact-aside__icon-img call"
              fill={true}
              src="/imgs/contact-aside/call.webp"
              alt="Contact Facebook"></Image>
            <span className="contact-aside__tooltip-text">
              Hotline 24/7: 0795.849.949
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
