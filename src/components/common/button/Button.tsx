import React from "react";
import styles from "./Button.module.scss";

function Button() {
  return (
    <div className={styles.button}>
      <div className={styles.button__innerText}>시작하기</div>
    </div>
  );
}

export default Button;
