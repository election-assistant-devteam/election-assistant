import React from "react";
import styles from "./Title.module.scss";

function Title() {
  return (
    <div className={styles.titleBox}>
      <div className={styles.titleBox__subTitle}>똑똑한 유권자가 되기 위한 첫 걸음,</div>
      <div className={styles.titleBox__mainTitle}>RunningMate</div>
    </div>
  );
}

export default Title;
