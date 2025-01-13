import React from "react";
import styles from "./styles/registersuccess.module.scss";
import Button from "@/components/common/button/Button";
import { Link } from "react-router-dom";

function index() {
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__message}>회원가입이 완료되었습니다!</div>
        <div className={styles.page__contents__returnButton}>
          <Link to={"/"}>
            <Button text={"초기화면으로 돌아가기"}></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
