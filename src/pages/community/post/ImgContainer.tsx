import styles from "./ImgContainer.module.scss";

interface Props {
  imgUrls: string[];
}

const ImgContainer = ({ imgUrls }: Props) => {
  return (
    <div className={styles.imgContainer}>
      {imgUrls?.map((item, index) => {
        return (
          <img
            className={styles.imgContainer__img}
            key={index}
            src={item}
            alt={`${index}번째 이미지`}
          />
        );
      })}
    </div>
  );
};

export default ImgContainer;
