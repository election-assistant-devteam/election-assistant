//import React from "react";
import styles from "./Button.module.scss";

interface Props {
  text: string;
  data?: string[];
  onClick?: () => void;
  className?: string;
}

function Button({ text, data, onClick, className }: Props) {
  return (
    <div className={`${styles.button} ${className}`} onClick={onClick}>
      <div className={styles.button__innerText}>{text}</div>
    </div>
  );
}

export default Button;
