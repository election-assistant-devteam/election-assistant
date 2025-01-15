import React from "react";
import styles from "./BotNav.module.scss";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";
import { MdOutlinePerson } from "react-icons/md";

function BotNav() {
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__navBox}>
          <IoDocumentTextOutline size="30" color="#21005d" />
          <GoHomeFill size="30" color="#21005d" />
          <MdOutlinePerson size="30" color="#21005d" />
        </div>
      </div>
    </div>
  );
}

export default BotNav;
