import React from "react";
import styles from "./IconButton.module.scss";

interface Props {
  text: string;
  Icon: React.ComponentType;
}

const IconButton = ({ text, Icon }: Props) => {
  return (
    <div className={styles.base}>
      <Icon className={styles.base__icon} size="40" />
      <div className={styles.base__text}>공지사항</div>
    </div>
  );
};

export default IconButton;
