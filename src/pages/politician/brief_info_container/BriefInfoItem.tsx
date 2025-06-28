import styles from "./BriefInfoItem.module.scss";

interface Props {
  label: string;
  data: string;
}

const BriefInfoItem = ({ label, data }: Props) => {
  return (
    <div className={styles.dataBox}>
      <div className={styles.dataBox__label}>{label}</div>
      <div className={styles.dataBox__data}>{data ? data : "로딩 중..."}</div>
    </div>
  );
};

export default BriefInfoItem;
