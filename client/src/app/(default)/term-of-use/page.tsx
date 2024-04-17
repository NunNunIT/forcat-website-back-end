// import libs
import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// import css
import "./page.css";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description:
    "Trang Điều khoản sử dụng của ForCat Shop mô tả các điều kiện và quy định mà người dùng phải tuân thủ khi sử dụng dịch vụ của chúng tôi. Hãy đảm bảo bạn đã đọc và hiểu rõ các điều khoản này trước khi sử dụng trang web của chúng tôi. Bằng cách tiếp tục sử dụng trang web của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong trang Điều khoản sử dụng này.",
};

export default function AboutUsPage() {
  return (
    <main className="term-of-use__container">
      <section className="term-of-use__about-information">
        <div className="term-of-use__about-information__wrapper">
          <h1 className="term-of-use__about-information__title">
            Điều khoản sử dụng
            <span className="term-of-use__about-information__title-after"></span>
          </h1>
        </div>
      </section>
      <div className="term-of-use-content-page ">
        <h2>1. Giới thiệu</h2>
        <p>Chào mừng quý khách hàng đến với FORCAT</p>
        <p>
          Chúng tôi là Cửa hàng chuyên kinh doanh các sản phẩm cho mèo FORCAT
          Shop&nbsp;có địa chỉ giao dịch tại khu phố 6, phường Linh Trung, thành
          phố Thủ Đức, thành phố Hồ Chí Minh&nbsp;và thành lập website chính
          thức tại www.forcat.com.
        </p>
        <p>
          Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa
          là quý khách đồng ý với các điều khoản này. Trang web có quyền thay
          đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua
          bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay
          khi được đăng trên trang web mà không cần thông báo trước. Và khi quý
          khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản
          này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi
          đó.
        </p>
        <p>
          Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay
          đổi của chúng tôi.
        </p>
        <h2>2. Hướng dẫn sử dụng website</h2>
        <p>
          Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc
          truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách
          hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua
          bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.
        </p>
        <p>
          Chúng tôi sẽ cấp một tài khoản (Account) sử dụng để khách hàng có thể
          mua sắm trên website forcat.com trong khuôn khổ Điều khoản và Điều
          kiện sử dụng đã đề ra.
        </p>
        <p>
          Quý khách hàng sẽ phải đăng ký tài khoản với thông tin xác thực về bản
          thân và phải cập nhật nếu có bất kỳ thay đổi nào. Mỗi người truy cập
          phải có trách nhiệm với mật khẩu, tài khoản và hoạt động của mình trên
          web. Hơn nữa, quý khách hàng phải thông báo cho chúng tôi biết khi tài
          khoản bị truy cập trái phép. Chúng tôi không chịu bất kỳ trách nhiệm
          nào, dù trực tiếp hay gián tiếp, đối với những thiệt hại hoặc mất mát
          gây ra do quý khách không tuân thủ quy định.
        </p>
        <p>
          Nghiêm cấm sử dụng bất kỳ phần nào của trang web này với mục đích
          thương mại hoặc nhân danh bất kỳ đối tác thứ ba nào nếu không được
          chúng tôi cho phép bằng văn bản. Nếu vi phạm bất cứ điều nào trong
          đây, chúng tôi sẽ hủy tài khoản của khách mà không cần báo trước.
        </p>
        <p>
          Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ
          website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối
          bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
        </p>
        <h2>3. Ý kiến của khách hàng</h2>
        <p>
          Tất cả nội dung trang web và ý kiến phê bình của quý khách đều là tài
          sản của chúng tôi. Nếu chúng tôi phát hiện bất kỳ thông tin giả mạo
          nào, chúng tôi sẽ khóa tài khoản của quý khách ngay lập tức hoặc áp
          dụng các biện pháp khác theo quy định của pháp luật Việt Nam.
        </p>
        <h2>4. Chấp nhận đơn hàng và giá cả</h2>
        <p>
          Chúng tôi có quyền từ chối hoặc hủy đơn hàng của quý khách vì bất kỳ
          lý do gì liên quan đến lỗi kỹ thuật, hệ thống một cách khách quan vào
          bất kỳ lúc nào.
        </p>
        <p>
          Ngoài ra, để đảm bảo tính công bằng cho khách hàng là người tiêu dùng
          cuối cùng của FORCAT, chúng tôi cũng sẽ&nbsp;từ chối các đơn hàng
          không nhằm mục đích sử dụng cho cá nhân, mua hàng số lượng nhiều hoặc
          với mục đích mua đi bán lại.
        </p>
        <p>
          Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất cho
          người tiêu dùng. Tuy nhiên, đôi lúc vẫn có sai sót xảy ra, ví dụ như
          trường hợp giá sản phẩm không hiển thị chính xác trên trang web hoặc
          sai giá, tùy theo từng trường hợp chúng tôi sẽ liên hệ hướng dẫn hoặc
          thông báo hủy đơn hàng đó cho quý khách. Chúng tôi cũng có quyền từ
          chối hoặc hủy bỏ bất kỳ đơn hàng nào dù đơn hàng đó đã hay chưa được
          xác nhận hoặc đã thanh toán.
        </p>
        <h2>5. Thay đổi hoặc hủy bỏ giao dịch tại forcat.com</h2>
        <p>
          Trong mọi trường hợp, khách hàng đều có quyền chấm dứt giao dịch nếu
          đã thực hiện các biện pháp sau đây:
        </p>
        <ul>
          <li>
            Thông báo cho FORCAT về việc hủy giao dịch qua đường dây nóng
            (hotline) 0795.849.949&nbsp;hoặc lời ghi nhắn tại
            forcatshop.contact@gmail.com
          </li>
          <li>
            Trả lại hàng hoá đã nhận nhưng chưa sử dụng hoặc hưởng bất kỳ lợi
            ích nào từ hàng hóa đó.
          </li>
        </ul>
        <h2>6. Giải quyết hậu quả do lỗi nhập sai thông tin tại FORCAT</h2>
        <p>
          Khách hàng có trách nhiệm cung cấp thông tin đầy đủ và chính xác khi
          tham gia giao dịch tại FORCAT. Trong trường hợp khách hàng nhập sai
          thông tin và gửi vào trang TMĐT forcat.com, FORCAT có quyền từ chối
          thực hiện giao dịch. Ngoài ra, trong mọi trường hợp, khách hàng đều có
          quyền đơn phương chấm dứt giao dịch nếu đã thực hiện các biện pháp sau
          đây:
        </p>
        <ul>
          <li>
            Thông báo cho FORCAT qua đường dây nóng 0795.849.949&nbsp;hoặc lời
            nhập nhắn tại địa chỉ forcatshop.contact@gmail.com
          </li>
          <li>
            Trả lại hàng hoá đã nhận nhưng chưa sử dụng hoặc hưởng bất kỳ lợi
            ích nào từ hàng hóa đó.
          </li>
        </ul>
        <p>
          Trong trường hợp sai thông tin phát sinh từ phía Petmal mà FORCAT có
          thể chứng minh đó là lỗi của hệ thống hoặc từ bên thứ ba (sai giá sản
          phẩm, sai xuất xứ, …), FORCAT&nbsp;sẽ đền bù cho khách hàng một mã
          giảm giá cho các lần mua sắm tiếp theo với mệnh giá tùy từng trường
          hợp cụ thể và có quyền không thực hiện giao dịch bị lỗi.
        </p>
        <h2>7. Thương hiệu và bản quyền</h2>
        <p>
          Mọi quyền sở hữu trí tuệ (đã đăng ký hoặc chưa đăng ký), nội dung
          thông tin và tất cả các thiết kế, văn bản, đồ họa, phần mềm, hình ảnh,
          video, âm nhạc, âm thanh, biên dịch phần mềm, mã nguồn và phần mềm cơ
          bản đều là tài sản của chúng tôi. Toàn bộ nội dung của trang web được
          bảo vệ bởi luật bản quyền của Việt Nam và các công ước quốc tế. Bản
          quyền đã được bảo lưu.
        </p>
        <h2>8. Quyền pháp lý</h2>
        <p>
          Các điều kiện, điều khoản và nội dung của trang web này được điều
          chỉnh bởi luật pháp Việt Nam và Tòa án có thẩm quyền tại Việt Nam sẽ
          giải quyết bất kỳ tranh chấp nào phát sinh từ việc sử dụng trái phép
          trang web này.
        </p>
        <h2>9. Quy định về bảo mật</h2>
        <p>
          Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng
          các biện pháp tốt nhất bảo vệ thông tin và việc thanh toán của quý
          khách. Thông tin của quý khách trong quá trình thanh toán sẽ được mã
          hóa để đảm bảo an toàn. Sau khi quý khách hoàn thành quá trình đặt
          hàng, quý khách sẽ thoát khỏi chế độ an toàn.
        </p>
        <p>
          Quý khách không được sử dụng bất kỳ chương trình, công cụ hay hình
          thức nào khác để can thiệp vào hệ thống hay làm thay đổi cấu trúc dữ
          liệu. Trang web cũng nghiêm cấm việc phát tán, truyền bá hay cổ vũ cho
          bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu
          của hệ thống. Cá nhân hay tổ chức vi phạm sẽ bị tước bỏ mọi quyền lợi
          cũng như sẽ bị truy tố trước pháp luật nếu cần thiết.
        </p>
        <p>
          Mọi thông tin giao dịch sẽ được bảo mật ngoại trừ trong trường hợp cơ
          quan pháp luật yêu cầu.
        </p>
        <h2>10. Thanh toán an toàn và tiện lợi tại FORCAT</h2>
        <p>
          Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa
          chọn áp dụng phương thức phù hợp:
        </p>
        <p>
          <strong>Cách 1</strong>
          <strong>:</strong>&nbsp;Thanh toán sau (COD – giao hàng và thu tiền
          tận nơi):
        </p>
        <p>
          Bước 1: Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng
          tin;
        </p>
        <p>
          Bước 2: Người mua xác thực đơn hàng (điện thoại, tin nhắn, email);
        </p>
        <p>Bước 3: FORCAT&nbsp;xác nhận thông tin Người mua;</p>
        <p>Bước 4: FORCAT&nbsp;chuyển hàng;</p>
        <p>Bước 5: Người mua nhận hàng và thanh toán.</p>
        <p>
          <strong>Cách 3</strong>
          <strong>:</strong>&nbsp;Thanh toán online qua thẻ tín dụng, chuyển
          khoản
        </p>
        <p>
          Bước 1: Người mua tìm hiểu thông tin về sản phẩm, dịch vụ được đăng
          tin;
        </p>
        <p>Bước 2: FORCAT xác thực đơn hàng (điện thoại, tin nhắn, email);</p>
        <p>Bước 3: FORCAT&nbsp;xác nhận thông tin Người mua;</p>
        <p>Bước 4: Ngưởi mua thanh toán;</p>
        <p>Bước 5:&nbsp; FORCAT chuyển hàng;</p>
        <p>Bước 6: Người mua nhận hàng.</p>
        <p>
          Đối với người mua hàng từ FORCAT thì phải tuẩn thu theo chính sách
          thanh toán của công ty.
        </p>
        <h2>11. Đảm bảo an toàn giao dịch tại FORCAT</h2>
        <p>
          Chúng tôi sử dụng các dịch vụ để bảo vệ thông tin về nội dung mà người
          bán đăng sản phẩm trên FORCAT. Để đảm bảo các giao dịch được tiến hành
          thành công, hạn chế tối đa rủi ro có thể phát sinh.
        </p>
        <h2>12. Luật pháp và thẩm quyền tại Lãnh thổ Việt Nam</h2>
        <p>
          Tất cả các Điều Khoản và Điều Kiện này và Hợp Đồng (và tất cả nghĩa vụ
          phát sinh ngoài hợp đồng hoặc có liên quan) sẽ bị chi phối và được
          hiểu theo luật pháp của Việt Nam. Nếu có tranh chấp phát sinh bởi các
          Quy định Sử dụng này, quý khách hàng có quyền gửi khiếu nại/khiếu kiện
          lên Tòa án có thẩm quyền tại Việt Nam để giải quyết.
        </p>
      </div>
    </main>
  );
}
