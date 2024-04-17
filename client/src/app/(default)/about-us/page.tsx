// import libs
import React from "react";
import Image from "next/image";
import type { Metadata } from "next";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "About us",
  description:
    "ForCat Shop - nơi mang lại những trải nghiệm tuyệt vời cho bạn và thú cưng của bạn. Với đội ngũ đam mê và kinh nghiệm, chúng tôi cam kết cung cấp những sản phẩm chất lượng và dịch vụ tận tâm nhất. Hãy cùng tìm hiểu thêm về chúng tôi và cách chúng tôi có thể giúp bạn chăm sóc và yêu thương thú cưng của mình một cách tốt nhất!",
};
export default function AboutUsPage() {
  return (
    <main className="about-us__container">
      <section className="about-us__about-information">
        <div className="about-us__about-information__wrapper">
          <h1 className="about-us__about-information__title">
            FORCAT SHOP - Cửa hàng Online
            <span className="about-us__about-information__title-after"></span>
          </h1>
          <h4 className="about-us__about-information__subtitle">
            FORCAT tự hào là một trong những cửa hàng phụ kiện cho mèo lớn và
            đáng tin cậy nhất tại Sài Gòn, nơi có thể thỏa mãn niềm đam mê trong
            cuộc chơi của hàng triệu tín đồ yêu Thú cưng từ Nam ra Bắc.
          </h4>
        </div>
        <div className="about-us__service__container">
          <div className="about-us__service__wrapper">
            <div className="about-us__service__imgs__cover">
              <Image
                className="about-us__service__img"
                fill={true}
                src="/imgs/about-us/about02_infor_1_ico.webp"
                alt="Chất lượng thật - Giá trị thật"></Image>
            </div>
            <h3>Chất lượng thật - Giá trị thật</h3>
            <p>
              Số lượng sản phẩm và dịch vụ tốt nhất với chủng loại đa dạng,
              phong phú sẽ đáp ứng tất cả nhu cầu mua sắm của bạn.
            </p>
          </div>
          <div className="about-us__service__wrapper">
            <div className="about-us__service__imgs__cover">
              <Image
                className="about-us__service__img"
                fill={true}
                src="/imgs/about-us/about02_infor_2_ico.webp"
                alt="Tích điểm"></Image>
            </div>
            <h3>Tích điểm dựa trên hóa đơn của bạn</h3>
            <p>
              Tất cả các khách hàng đã mua sắm tại ForCat có tổng hóa đơn mua
              sắm tích lũy từ 1000 điểm sẽ được một phần quà giá trị tương
              đương.
            </p>
          </div>
          <div className="about-us__service__wrapper">
            <div className="about-us__service__imgs__cover">
              <Image
                className="about-us__service__img"
                fill={true}
                src="/imgs/about-us/about02_infor_3_ico.webp"
                alt="Hỗ trợ giao hàng toàn quốc"></Image>
            </div>
            <h3>Hỗ trợ giao hàng toàn quốc</h3>
            <p>
              Miễn phí vận chuyển nội thành thành phố Hồ Chí Minh cho các đơn
              hàng từ 399.000đ trở lên.
            </p>
          </div>
        </div>
      </section>
      <section className="about-us__about-members">
        <div className="about-us__about-members__wrapper">
          <h1 className="about-us__about-members__title">
            Đội ngũ nhân viên
            <span className="about-us__about-members__title-after"></span>
          </h1>
          <h4 className="about-us__about-members__subtitle">
            Chúng tôi tạo dựng môi trường làm việc thân thiện cho nhân viên, các
            cấp quản lý luôn lắng nghe, thấu hiểu, hỗ trợ cho nhân viên mình có
            thể phát huy mọi tiềm năng .
          </h4>
        </div>
        <div className="about-us__members__container">
          <div className="about-us__members__wrapper">
            <div className="about-us__members__imgs__cover">
              <Image
                className="about-us__members__img"
                fill={true}
                src="/imgs/about-us/phannguyenhaiyen.webp"
                alt="Chất lượng thật - Giá trị thật"></Image>
            </div>
            <h4>Nguyễn Thị Hồng Nhung</h4>
            <p>&quot;Slogan Slogannnn&quot;</p>
          </div>
          <div className="about-us__members__wrapper">
            <div className="about-us__members__imgs__cover">
              <Image
                className="about-us__members__img"
                fill={true}
                src="/imgs/about-us/phannguyenhaiyen.webp"
                alt="Tích điểm"></Image>
            </div>
            <h4>Phan Nguyễn Hải Yến</h4>
            <p>&quot;Slogan Slogannnn&quot;</p>
          </div>
          <div className="about-us__members__wrapper">
            <div className="about-us__members__imgs__cover">
              <Image
                className="about-us__members__img"
                fill={true}
                src="/imgs/about-us/phannguyenhaiyen.webp"
                alt="Hỗ trợ giao hàng toàn quốc"></Image>
            </div>
            <h4>Lê Đức Mạnh</h4>
            <p>&quot;Slogan Slogannnn&quot;</p>
          </div>
          <div className="about-us__members__wrapper">
            <div className="about-us__members__imgs__cover">
              <Image
                className="about-us__members__img"
                fill={true}
                src="/imgs/about-us/phannguyenhaiyen.webp"
                alt="Hỗ trợ giao hàng toàn quốc"></Image>
            </div>
            <h4>Lê Trung Hiếu</h4>
            <p>&quot;Slogan Slogannnn&quot;</p>
          </div>
          <div className="about-us__members__wrapper">
            <div className="about-us__members__imgs__cover">
              <Image
                className="about-us__members__img"
                fill={true}
                src="/imgs/about-us/phannguyenhaiyen.webp"
                alt="Hỗ trợ giao hàng toàn quốc"></Image>
            </div>
            <h4>Nguyễn Viết Kha</h4>
            <p>&quot;Slogan Slogannnn&quot;</p>
          </div>
          <div className="about-us__members__wrapper">
            <div className="about-us__members__imgs__cover">
              <Image
                className="about-us__members__img"
                fill={true}
                src="/imgs/about-us/phannguyenhaiyen.webp"
                alt="Hỗ trợ giao hàng toàn quốc"></Image>
            </div>
            <h4>Nguyễn Nhật Tấn</h4>
            <p>&quot;Slogan Slogannnn&quot;</p>
          </div>
        </div>
      </section>
      {/* <section className="about-us__banner">
        <Image
          className="about-us__banner-img"
          src="/imgs/about-us/banner-about-us-1.webp"
          fill={true}
          alt="about-us-banner-1"
        />
      </section> */}
      <section className="about-us__about-value">
        <div className="about-us__about-value__wrapper">
          <h1 className="about-us__about-value__title">
            Giá trị cốt lõi
            <span className="about-us__about-value__title-after"></span>
          </h1>
          <h4 className="about-us__about-value__subtitle">
            Vì sứ mệnh tạo nên những giá trị thương hiệu, chúng tôi đã, đang và
            sẽ luôn nỗ lực hết mình vì sự phát triển – khẳng định thương hiệu
            Việt, mang lại những giá trị lâu dài cho doanh nghiệp.
          </h4>
        </div>
        <div className="about-us__value__container">
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <Image
                className="about-us__value__img"
                fill={true}
                src="/imgs/about-us/about02_services_1_ico.webp"
                alt="Chất lượng thật - Giá trị thật"></Image>
            </div>
            <h4>Chất lượng thật - Giá trị thật</h4>
            <p>
              Số lượng sản phẩm và dịch vụ tốt nhất với chủng loại đa dạng,
              phong phú sẽ đáp ứng tất cả nhu cầu mua sắm của bạn.
            </p>
          </div>
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <Image
                className="about-us__value__img"
                fill={true}
                src="/imgs/about-us/about02_services_2_ico.webp"
                alt="Tích điểm"></Image>
            </div>
            <h4>Tích điểm dựa trên hóa đơn của bạn</h4>
            <p>
              Tất cả các khách hàng đã mua sắm tại ForCat có tổng hóa đơn mua
              sắm tích lũy từ 1000 điểm sẽ được một phần quà giá trị tương
              đương.
            </p>
          </div>
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <Image
                className="about-us__value__img"
                fill={true}
                src="/imgs/about-us/about02_services_3_ico.webp"
                alt="Hỗ trợ giao hàng toàn quốc"></Image>
            </div>
            <h4>Hỗ trợ giao hàng toàn quốc</h4>
            <p>
              Miễn phí vận chuyển nội thành thành phố Hồ Chí Minh cho các đơn
              hàng từ 399.000đ trở lên.
            </p>
          </div>
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <Image
                className="about-us__value__img"
                fill={true}
                src="/imgs/about-us/about02_services_4_ico.webp"
                alt="Chất lượng thật - Giá trị thật"></Image>
            </div>
            <h4>Chất lượng thật - Giá trị thật</h4>
            <p>
              Số lượng sản phẩm và dịch vụ tốt nhất với chủng loại đa dạng,
              phong phú sẽ đáp ứng tất cả nhu cầu mua sắm của bạn.
            </p>
          </div>
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <Image
                className="about-us__value__img"
                fill={true}
                src="/imgs/about-us/about02_services_5_ico.webp"
                alt="Tích điểm"></Image>
            </div>
            <h4>Tích điểm dựa trên hóa đơn của bạn</h4>
            <p>
              Tất cả các khách hàng đã mua sắm tại ForCat có tổng hóa đơn mua
              sắm tích lũy từ 1000 điểm sẽ được một phần quà giá trị tương
              đương.
            </p>
          </div>
          <div className="about-us__value__wrapper">
            <div className="about-us__value__imgs__cover">
              <Image
                className="about-us__value__img"
                fill={true}
                src="/imgs/about-us/about02_services_6_ico.webp"
                alt="Hỗ trợ giao hàng toàn quốc"></Image>
            </div>
            <h4>Hỗ trợ giao hàng toàn quốc</h4>
            <p>
              Miễn phí vận chuyển nội thành thành phố Hồ Chí Minh cho các đơn
              hàng từ 399.000đ trở lên.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
