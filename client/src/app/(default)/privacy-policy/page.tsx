// import libs
import React from "react";
import type { Metadata } from "next";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "Chính sách bảo mật thông tin",
  description:
    "Chính sách bảo mật thông tin của ForCat Shop cam kết việc bảo vệ thông tin cá nhân của bạn và thú cưng của bạn. Chúng tôi tôn trọng và bảo vệ quyền riêng tư của mỗi khách hàng, và cam kết tuân thủ các quy định bảo vệ dữ liệu.",
};

export default async function AboutUsPage() {
  return (
    <main className="privacy-policy__container">
      <section className="privacy-policy__about-information">
        <div className="privacy-policy__about-information__wrapper">
          <h1 className="privacy-policy__about-information__title">
            Chính sách bảo mật thông tin
            <span className="privacy-policy__about-information__title-after"></span>
          </h1>
        </div>
      </section>
      <div className="privacy-policy-content-page">
        <h2>1. Mục đích và phạm vi thu thập</h2>
        <p>
          Việc thu thập dữ liệu chủ yếu trên website<span>&nbsp;</span>
          <strong>FORCAT</strong>
          <span>&nbsp;</span>bao gồm: email, điện thoại, địa chỉ khách hàng. Đây
          là các thông tin mà<span>&nbsp;</span>
          <strong>FORCAT</strong>
          <span>&nbsp;</span>cần khách hàng cung cấp bắt buộc khi sử dụng dịch
          vụ và để<span>&nbsp;</span>
          <strong>FORCAT</strong>
          <span>&nbsp;</span>liên hệ xác nhận khi khách hàng đăng ký sử dụng
          dịch vụ trên website nhằm đảm bảo quyền lợi cho cho người tiêu dùng.
        </p>
        <h2>2. Phạm vi sử dụng thông tin</h2>
        <p>Công ty sử dụng thông tin khách hàng cung cấp để:</p>
        <ul>
          <li>- Cung cấp các dịch vụ đến khách hàng;</li>
          <li>
            - Gửi các thông báo về các hoạt động trao đổi thông tin giữa khách
            hàng và website FORCAT;
          </li>
          <li>
            - Liên lạc và giải quyết với khách hàng trong những trường hợp đặc
            biệt;
          </li>
          <li>
            - Không sử dụng thông tin cá nhân của khách hàng ngoài mục đích xác
            nhận và liên hệ có liên quan đến giao dịch tại FORCAT;
          </li>
          <li>
            - Trong trường hợp có yêu cầu của pháp luật: Công ty có trách nhiệm
            hợp tác cung cấp thông tin cá nhân&nbsp;khách hàng khi có yêu cầu từ
            cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều
            tra liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng.
            Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân
            của&nbsp;khách hàng.
          </li>
        </ul>

        <h2>3. Thời gian lưu trữ thông tin</h2>
        <p>
          Dữ liệu cá nhân của&nbsp;khách hàng sẽ được lưu trữ cho đến khi có yêu
          cầu hủy bỏ hoặc khách hàng yêu cầu hủy bỏ. Còn lại trong mọi trường
          hợp thông tin cá nhân&nbsp;khách hàng sẽ được bảo mật trên máy chủ
          của&nbsp;<b>FORCAT</b>.
        </p>
        <h2>4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</h2>
        <ul>
          <li>Cửa hàng chuyên kinh doanh các sản phẩm cho mèo FORCAT Shop</li>
          <li>
            - Địa chỉ: Khu phố 6, phường Linh Trung, thành phố Thủ Đức, thành
            phố Hồ Chí Minh
          </li>
          <li>
            - Email:<span>&nbsp;forcatshop.contact@gmail.com</span>
          </li>
          <li>- Hotline: 0795.849.949</li>
        </ul>
        <h2>
          5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu
          cá nhân của mình
        </h2>
        <ul>
          <li>
            Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ
            thông tin cá nhân của mình bằng cách yêu cầu chúng tôi thực hiện
            việc này.
          </li>
          <li>
            Khách hàng có quyền gửi khiếu nại về người bán đến Ban quản trị của
            website khuyến mại FORCAT. Khi tiếp nhận những phản hồi này, chúng
            tôi sẽ xác nhận lại thông tin. Trường hợp đúng như phản ánh của
            thành viên tùy theo mức độ, chúng tôi sẽ có những biện pháp xử lý
            kịp thời.
          </li>
        </ul>
        <h2>6. Cam kết bảo mật thông tin cá nhân khách hàng</h2>
        <ul>
          <li>
            Thông tin cá nhân của khách hàng trên<span>&nbsp;</span>
            <strong>FORCAT</strong>
            <span>&nbsp;</span>được&nbsp;cam kết bảo mật tuyệt đối theo chính
            sách bảo vệ thông tin cá nhân của<span>&nbsp;</span>
            <strong>FORCAT</strong>. Việc thu thập và sử dụng thông tin của
            mỗi&nbsp;khách hàng chỉ được thực hiện khi có sự đồng ý của khách
            hàng đó trừ những trường hợp pháp luật có quy định khác.
          </li>
          <li>
            Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3
            nào về thông tin cá nhân của&nbsp;khách hàng&nbsp;khi không có sự
            cho phép đồng ý từ&nbsp;khách hàng.
          </li>
          <li>
            Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn
            đến mất mát dữ liệu cá nhân. Chúng tôi sẽ có trách nhiệm thông báo
            vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo
            cho&nbsp;khách hàng được biết.
          </li>
          <li>
            Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của&nbsp;khách
            hàng&nbsp;bao gồm thông tin hóa đơn kế toán chứng từ số hóa
            trên&nbsp;<b>FORCAT.vn</b>
          </li>
          <li>
            Ban quản lý&nbsp;<b>FORCAT.vn&nbsp;</b>yêu cầu các cá nhân khi đăng
            ký/mua hàng phải cung cấp đầy đủ thông tin cá nhân có liên quan như:
            <strong>
              <span>&nbsp;</span>Họ và tên, địa chỉ liên lạc, email, điện thoại
              <span>&nbsp;</span>
            </strong>
            và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban
            quản lý&nbsp;<b>FORCAT</b>&nbsp;không chịu trách nhiệm cũng như
            không giải quyết mọi khiếu nại có liên quan đến quyền lợi
            của&nbsp;khách hàng đó nếu xét thấy tất cả thông tin cá nhân
            của&nbsp;khách hàng đó cung cấp khi đăng ký ban đầu là không chính
            xác.
          </li>
        </ul>
      </div>
    </main>
  );
}
