import React from "react";
import styles from "./PrivcayRow.module.scss";

interface PrivacyStrData {
  title: string;
  content: string;
}

interface Props {
  data: PrivacyStrData;
}

const PrivacyRow = ({ data }: Props) => {
  return (
    <div className={styles.privacyRow}>
      <div className={styles.privacyRow__title}>{data.title}</div>
      <div className={styles.privacyRow__content}>{data.content}</div>
    </div>
  );
};

export default PrivacyRow;
