import React from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  data?: string[];
}

function Button({ text, data }: Props) {
  const handleClick = () => {
    //여기서 데이터 정합성 체크하면될듯
    if (text === "로그인") {
      data.forEach((i: string) => {
        console.log(i);
      });
    }
  };

  return (
    <div className={styles.button} onClick={handleClick}>
      <div className={styles.button__innerText}>{text}</div>
    </div>
  );
}

export default Button;
