import React from "react";
import styles from "./BotNav.module.scss";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { MdOutlinePerson } from "react-icons/md";
import { MdPerson } from "react-icons/md";

import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { curMainNum } from "@/recoil/atoms/curMainNum";
import { prevMainNum } from "@/recoil/atoms/prevMainNum";

// interface Props {
//   view: number;
//   handleView: (viewNum: number) => void;
// }

function BotNav() {
  // console.log(view);
  const [curView, setCurView] = useRecoilState(curMainNum);
  const [prevView, setPrevView] = useRecoilState(prevMainNum);

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__navBox}>
          <div
            className={styles.page__contents__navBox__button}
            onClick={() => {
              setPrevView(curView);
              setCurView(0);
            }}
          >
            {curView === 0 ? <IoDocumentText size="30" color="#21005d" /> : <IoDocumentTextOutline size="30" color="#21005d" />}
          </div>
          <div
            className={styles.page__contents__navBox__button}
            onClick={() => {
              setPrevView(curView);
              setCurView(1);
            }}
          >
            {curView === 1 ? <GoHomeFill size="30" color="#21005d" /> : <GoHome size="30" color="#21005d" />}
          </div>
          <div
            className={styles.page__contents__navBox__button}
            onClick={() => {
              setPrevView(curView);
              setCurView(2);
            }}
          >
            {curView === 2 ? <MdPerson size="30" color="#21005d" /> : <MdOutlinePerson size="30" color="#21005d" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotNav;
