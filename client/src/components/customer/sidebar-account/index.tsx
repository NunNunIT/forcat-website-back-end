// "use client";

// import React, { useRef, useEffect, useState } from 'react';
// import Image from 'next/image'
// import Link from 'next/link'
// import classNames from "classnames/bind";
// import styles from "./styles.module.css";


// const cx = classNames.bind(styles);


// const CustomerSidebarAccount: React.FC = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleLogoutClick = () => {
//     setIsModalVisible(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalVisible(false);
//   };


//   return (
//     <aside className={cx("account-history__aside")}>
//       <a href="#" className={cx("avatar")}>
//         <span className={cx("image-container")}>
//           <img src="/imgs/test.png" alt="avatar" />
//         </span>
//         <div className={cx("user_name")}>
//           {/* <h3><%= (user.user.user_name) ? user.user.user_name : '' %></h3> */}
//           <h3>user name</h3>
//         </div>
//       </a>
//       <ul className={cx("side-menu top")}>
//         <li className={cx("side-menu__ele")} >
//           <a href="/account/information" id="info-link">
//             <span className={cx("material-icons-outlined")}>
//               perm_contact_calendar
//             </span>
//             <span className={cx("text")}>Thông tin cá nhân</span>
//           </a>
//         </li>
//         <li className={cx("side-menu__ele")} >
//           <a href="/account/purchase-history">
//             <span className={cx("material-icons-outlined")}>
//               shopping_bag
//             </span>
//             <span className={cx("text")}>Lịch sử đơn mua</span>
//           </a>
//         </li>
//         <li className={cx("side-menu__ele")} >
//           <a href="/account/warranty-claim">
//             <span className={cx("material-icons-outlined")}>
//               build
//             </span>
//             <span className={cx("text")}>Yêu cầu bảo hành</span>
//           </a>
//         </li>
//       </ul>
//       <ul className={cx("side-menu")}>
//         <li className={cx("side-menu__ele")} >
//           <a href="/account/change-password">
//             <span className={cx("material-icons-outlined")}>
//               settings
//             </span>
//             <span className={cx("text")}>Đổi mật khẩu</span>
//           </a>
//         </li>
//         <li className={cx("side-menu__ele")} onClick={handleLogoutClick}>
//           <p className={cx("btn-logout")}>
//             <span className={cx("material-icons-outlined")}>logout</span>
//             <span className={cx("text")}>Đăng xuất</span>
//           </p>
//         </li>
//       </ul>
//       {isModalVisible && (
//         <div className={cx("sidebar-account__popup")}>
//           <div className={cx("popup__main")}>
//             <div className={cx("popup__main--right")}>
//               <div className={cx("popup__content")}>
//                 <div className={cx("popup--top")}>
//                   <h5 className={cx("popup__title")}>Đăng xuất</h5>
//                   <div className={cx("btn-close")} onClick={handleCloseModal}>
//                     <span className={cx("material-icons-outlined")}>cancel</span>
//                   </div>
//                 </div>
//                 <p className={cx("popup__subtitle")}>Quý khách có chắc chắn muốn đăng xuất không?</p>
//                 <div className={cx("logout_img")}>
//                   <img src="/imgs/test.png" alt="goodbye" />
//                 </div>
//                 <div className={cx("popup__button")}>
//                   <button className={cx("btn btn--outlined pri btn-cancel btn-cancel-logout")} onClick={handleCloseModal}>Hủy</button>
//                   <a href="/auth/logout" className={cx("btn btn--filled pri btn-logout")}>Đăng xuất</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </aside>
//   )
// }

// export default CustomerSidebarAccount;