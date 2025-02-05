import React from "react";
import styles from "./BotNav.module.scss";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { GoHome } from "react-icons/go";
import { MdOutlinePerson } from "react-icons/md";
import { MdPerson } from "react-icons/md";

interface Props {
  view: number;
  handleView: (viewNum: number) => void;
}

function BotNav({ view, handleView }: Props) {
  // console.log(view);
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__navBox}>
          <div className={styles.page__contents__navBox__button}>
            {view === 0 ? (
              <IoDocumentText size="30" color="#21005d" />
            ) : (
              <IoDocumentTextOutline
                size="30"
                color="#21005d"
                onClick={() => {
                  handleView(0);
                }}
              />
            )}
          </div>
          <div className={styles.page__contents__navBox__button}>
            {view === 1 ? <GoHomeFill size="30" color="#21005d" /> : <GoHome size="30" color="#21005d" onClick={() => handleView(1)} />}
          </div>
          <div className={styles.page__contents__navBox__button}>
            {view === 2 ? <MdPerson size="30" color="#21005d" /> : <MdOutlinePerson size="30" color="#21005d" onClick={() => handleView(2)} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotNav;
