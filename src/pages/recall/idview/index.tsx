import React, { useState } from "react";
import styles from "./styles/IdView.module.scss";
import Button from "@/components/common/button/Button";
import InputBox from "@/components/common/input/InputBox";

function index() {
  const [email, setEmail] = useState<string>();
  const [verifycode, setVerifycode] = useState<string>();

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__inputSection}>
          <div className={styles.page__contents__inputSection__email}>
            <InputBox placeHolder={"이메일을 입력하세요"} handleData={setEmail}></InputBox>
            <button className={styles.button}>인증번호</button>
          </div>
          <div className={styles.page__contents__inputSection__verification}>
            <InputBox placeHolder={"인증번호 입력"} handleData={setVerifycode}></InputBox>
            <button className={styles.button}>확인</button>
          </div>
        </div>
        <Button text={"아이디 찾기"}></Button>
      </div>
    </div>
  );
}

export default index;
