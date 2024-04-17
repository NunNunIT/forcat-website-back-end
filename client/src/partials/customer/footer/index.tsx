// import libs
import Link from "next/link";
import Image from "next/image"
import classNames from "classnames/bind";

// import components
import { CustomerLogo } from "@/components";

// import css
import styles from "./footer.module.css";

const cx = classNames.bind(styles);

// interface
interface IFooterLinkProps {
  href: string;
  image: {
    src: string;
    alt: string;
  };
}

const linkToSocialMedias: IFooterLinkProps[] = [
  {
    href: "https://www.facebook.com/forcat.official",
    image: {
      src: "/icon-facebook.svg",
      alt: "Facebook",
    }
  },
  {
    href: "https://www.instagram.com/forcat_shop/",
    image: {
      src: "/icon-instagram.svg",
      alt: "Instagram",
    }
  },
  {
    href: "https://www.tiktok.com/@forcat.shop7",
    image: {
      src: "/icon-tiktok.svg",
      alt: "Tiktok",
    }
  }
]

const email: string = "forcatshop.contact@gmail.com";
const locationURL: string = "https://maps.app.goo.gl/GbwxfoKVzvYoN1hn9"

export default function Footer() {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer__container")}>
        <div className={cx("footer__company-name")}>
          <CustomerLogo className={cx("footer__logo")} white />
          <span>Cửa hàng đồ dùng cho mèo Forcat</span>
          <div className={cx("footer__list-social-media")}>
            {linkToSocialMedias.map(
              (link: IFooterLinkProps, index: number) => (
                <Link key={index} href={link.href} target="_blank">
                  <span className={cx("footer__social-media-container")}>
                    <Image src={link.image.src} fill
                      alt={`Icon mạng xã hội ${link.image.alt}`}
                    />
                  </span>
                </Link>
              ))
            }
          </div>
        </div>
        <div className={cx("footer__about")}>
          <div className={cx("footer__title")}>
            <h3>VỀ Forcat Shop</h3>
          </div>
          <div className={cx("footer__list")}>
            <Link href="/about-us" className={cx("footer__list-item")}>
              Giới thiệu về Forcat Shop
            </Link>
            <Link href="/term-of-use" className={cx("footer__list-item")}>
              Điều khoản chung
            </Link>
            <Link href="/privacy-policy" className={cx("footer__list-item")}>
              Chính sách bảo mật
            </Link>
          </div>
        </div>
        <div className={cx("footer__help")}>
          <div className={cx("footer__title")}>
            <h3>HỖ TRỢ</h3>
          </div>
          <div className={cx("footer__list")}>
            <Link href="#" className={cx("footer__list-item")}>
              Trung tâm trợ giúp
            </Link>
            <Link href="#" className={cx("footer__list-item")}>
              Chính sách bảo hành
            </Link>
            <Link href="#" className={cx("footer__list-item")}>
              Chính sách trả hàng
            </Link>
          </div>
        </div>
        <div className={cx("footer__contact")}>
          <div className={cx("footer__title")}>
            <h3>LIÊN HỆ</h3>
          </div>
          <div className={cx("footer__list")}>
            <div className={cx("footer__list-item")}>
              <span className='material-icons-outlined'>location_on</span>
              <Link
                href={locationURL}
                target="_blank"
                className={cx("footer__list-item")}
              >
                Linh Trung, Thủ Đức, Hồ Chí Minh
              </Link>
            </div>
            <div className={cx("footer__list-item")}>
              <span className='material-icons-outlined'>call</span>
              <span className={cx("footer__list-item", "phone")}>
                1900 123 789
              </span>
            </div>
            <div className={cx("footer__list-item")}>
              <span className='material-icons-outlined'>mail</span>
              <Link href={`mailto:${email}`}
                className={cx("footer__list-item")}
              >
                {email}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("footer__copyright")}>
          <span>2024 - Bản quyền thuộc cửa hàng FORCAT</span>
        </div>
    </footer>
  );
}
