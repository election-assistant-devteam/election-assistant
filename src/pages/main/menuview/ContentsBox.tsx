import React from "react";
import styles from "./ContentsBox.module.scss";

interface Props {
  viewNum: number;
}

const ContentsBox = ({ viewNum }: Props) => {
  return <div className={styles.page}>뭥미</div>;
};

export default ContentsBox;
