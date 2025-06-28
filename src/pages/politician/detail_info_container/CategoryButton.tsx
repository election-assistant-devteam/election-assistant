import styles from "./CategoryButton.module.scss";

interface Props {
  label: string;
  index: number;
  viewNum: number;
  setViewNum: React.Dispatch<React.SetStateAction<number>>;
}

const CategoryButton = ({ label, index, viewNum, setViewNum }: Props) => {
  return (
    <div
      className={viewNum === index ? `${styles.category} ${styles.active}` : styles.category}
      onClick={() => {
        setViewNum(index);
      }}
    >
      {label}
    </div>
  );
};

export default CategoryButton;
