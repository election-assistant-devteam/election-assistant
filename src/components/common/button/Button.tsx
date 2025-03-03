//import React from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  data?: string[];
  onClick?: () => void;
}

function Button({ text, data, onClick }: Props) {
  // const handleClick = () => {
  //   //여기서 데이터 정합성 체크하면될듯
  //   if (text === "로그인") {
  //     data.forEach((i: string) => {
  //       console.log(i);
  //     });
  //   }
  // };

  return (
    <div className={styles.button} onClick={onClick}>
      <div className={styles.button__innerText}>{text}</div>
    </div>
  );
}

export default Button;
