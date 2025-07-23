import styles from "./TosView.module.scss";

const TosView = () => {
  const tosItem = [
    {
      id: 1,
      text: "특정 정치인에 대한 원색적인 비속어 표현",
    },
    {
      id: 2,
      text: "다른 사용자에 대한 공격적인 언행",
    },
  ];
  return (
    <div className={styles.tosView}>
      <div className={styles.tosView__title}>이용약관</div>
      <div className={styles.tosView__content}>
        <div className={styles.tosView__content__subtitle}>
          다음과 같은 경우, 사이트 이용에 있어 불이익 및 제재를 받을 수 있습니다.
        </div>
        {tosItem.map((item, _) => (
          <div className={styles.tosView__content__item} key={item.id}>
            {item.text}{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TosView;
