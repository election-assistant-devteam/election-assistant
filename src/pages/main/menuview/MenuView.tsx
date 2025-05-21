//import React from "react";
import styles from "./styles/menuview.module.scss";

import { PiQuestionBold } from "react-icons/pi";
import { BiEnvelope } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { TbBell } from "react-icons/tb";
import BotNav from "@/components/common/botnav/BotNav";
import { useNavigate } from "react-router-dom";
import SideNav from "@/components/common/TopNav/TopNav";

// interface Props {
//   view: number;
//   handleView: (viewNum: number) => void;
// }

function MenuView() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <SideNav></SideNav>
        <div className={styles.page__contents__topNav}>
          <div
            className={styles.page__contents__topNav__item}
            onClick={() => navigate("/notification")}
          >
            <TbBell className={styles.page__contents__topNav__item__icon} size="40" />
            <div className={styles.page__contents__topNav__item__text}>공지사항</div>
          </div>
          <div className={styles.page__contents__topNav__item} onClick={() => navigate("/faq")}>
            <PiQuestionBold className={styles.page__contents__topNav__item__icon} size="40" />
            <div className={styles.page__contents__topNav__item__text}>FAQ</div>
          </div>
          <div className={styles.page__contents__topNav__item} onClick={() => navigate("/inquiry")}>
            <BiEnvelope className={styles.page__contents__topNav__item__icon} size="40" />
            <div className={styles.page__contents__topNav__item__text}>1:1 문의</div>
          </div>
          {/* <div className={styles.page__contents__topNav__item}>
            <FiSettings className={styles.page__contents__topNav__item__icon} size="40" />
            <div className={styles.page__contents__topNav__item__text}>설정</div>
          </div> */}
        </div>
        <div className={styles.page__contents__menuList}>
          <div className={styles.page__contents__menuList__item}>
            <div className={styles.page__contents__menuList__item__text}>준비중입니다</div>
            <div className={styles.page__contents__menuList__item__icon}>
              <MdKeyboardArrowRight size="40" />
            </div>
          </div>
          <div className={styles.page__contents__menuList__item}>
            <div className={styles.page__contents__menuList__item__text}>준비중입니다</div>
            <div className={styles.page__contents__menuList__item__icon}>
              <MdKeyboardArrowRight size="40" />
            </div>
          </div>
          <div className={styles.page__contents__menuList__item}>
            <div className={styles.page__contents__menuList__item__text}>준비중입니다</div>
            <div className={styles.page__contents__menuList__item__icon}>
              <MdKeyboardArrowRight size="40" />
            </div>
          </div>
        </div>
      </div>
      <BotNav></BotNav>
    </div>
  );
}

export default MenuView;
