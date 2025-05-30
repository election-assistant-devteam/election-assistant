import React from "react";
import styles from "./DataCard.module.scss";

interface DataCardProps {
  name: string;
  value: string;
}

const DataCard = ({ name, value }: DataCardProps) => {
  return (
    <div className={styles.datacard}>
      <div className={styles.datacard__label}>{name}</div>
      <div className={styles.datacard__value}>{value ? value : "로딩 중..."}</div>
    </div>
  );
};

export default DataCard;
