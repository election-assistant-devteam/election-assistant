import React, { useState } from "react";
import styles from "./styles/PwView.module.scss";
import InputBox from "@/components/common/input/InputBox";
import Button from "@/components/common/button/Button";

function index() {
  const [id, setId] = useState<string>();
  const [email, setEmail] = useState<string>();

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__inputSection}>
          <div className={styles.page__contents__inputSection__id}>
            <InputBox placeHolder={"아이디를 입력하세요"} handleData={setId}></InputBox>
          </div>
          <div className={styles.page__contents__inputSection__email}>
            <InputBox placeHolder={"이메일을 입력하세요"} handleData={setEmail}></InputBox>
          </div>
        </div>
        <Button text={"비밀번호 찾기"}></Button>
      </div>
    </div>
  );
}

export default index;
