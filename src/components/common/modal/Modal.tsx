import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import { GiCancel } from "react-icons/gi";

interface Props {
  type: string;
  available: (bool: boolean) => void;
}

function Modal({ type, available }: Props) {
  useEffect(() => {
    console.log("hello", available);
  }, [available]);
  console.log("available:", available);
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__head}>
          <div className={styles.page__contents__head__titleBox}>
            <div className={styles.page__contents__head__titleBox__title}>{`관심 ${type} 수정`}</div>
            <GiCancel
              color="#21005d"
              size="30"
              className={styles.page__contents__head__titleBox__icon}
              onClick={() => {
                available(false);
              }}
            />
          </div>
          <div className={styles.page__contents__head__inputBox}>
            <input type="text" placeholder={`검색할 ${type}을 입력하세요`} />
          </div>
        </div>
        <div className={styles.page__contents__tail}>
          <button></button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
