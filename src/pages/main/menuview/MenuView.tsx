import styles from "./styles/menuview.module.scss";
//
import { PiQuestionFill } from "react-icons/pi";
import { PiQuestionBold } from "react-icons/pi";

import { BiSolidEnvelope } from "react-icons/bi";
import { BiEnvelope } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { TbBellFilled } from "react-icons/tb";
import { TbBell } from "react-icons/tb";
//
import BotNav from "@/components/common/botnav/BotNav";
import MenuBar from "@/components/common/TopNav/TopNav";
import { useState } from "react";
//
import Faq from "@/pages/faq/Faq";
import Inquiry from "@/pages/inquiry/Inquiry";
import Notification from "@/pages/notification/Notification";
import TopNavItem from "./topnavitem/TopNavItem";

function MenuView() {
  const [viewNum, setViewNum] = useState<number>(0);
  let screen; // 현재 화면에 보여주는 컴포넌트 종류를 담는 변수

  const topNavItemDataSet = [
    {
      idx: 0,
      activeIcon: <TbBellFilled />,
      inActiveIcon: <TbBell />,
      label: "공지사항",
    },
    {
      idx: 1,
      activeIcon: <PiQuestionFill />,
      inActiveIcon: <PiQuestionBold />,
      label: "FAQ",
    },
    {
      idx: 2,
      activeIcon: <BiSolidEnvelope />,
      inActiveIcon: <BiEnvelope />,
      label: "문의하기",
    },
  ];

  switch (viewNum) {
    case 0:
      screen = <Notification />;
      break;
    case 1:
      screen = <Faq />;
      break;
    case 2:
      screen = <Inquiry />;
      break;
    default:
      screen = <div>no screen found</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <MenuBar />
        <div className={styles.page__contents__topNav}>
          {topNavItemDataSet.map((item) => (
            <TopNavItem
              idx={item.idx}
              icon={viewNum === item.idx ? item.activeIcon : item.inActiveIcon}
              label={item.label}
              isActive={viewNum === item.idx ? true : false}
              setViewNum={setViewNum}
            />
          ))}
        </div>
        <div className={styles.page__contents__menuList}>{screen}</div>
      </div>
      <BotNav></BotNav>
    </div>
  );
}

export default MenuView;
