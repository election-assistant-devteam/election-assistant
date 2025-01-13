import React, { useState } from "react";
import styles from "./styles/login.module.scss";
import Title from "@/components/common/title/Title";
import Button from "@/components/common/button/Button";
import InputBox from "@/components/common/input/InputBox";
import { Link, useNavigate } from "react-router-dom";

function index() {
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/login/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({
          id: id,
          pw: pw,
        }),
      },
    });
    const result = await response.json();

    if (response.status === 200) {
      console.log(result);
      navigate("/main");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__symbolBox}>
          <div className={styles.page__contents__symbolBox__logoBox}></div>
          <div className={styles.page__contents__symbolBox__titleBox}>
            <Title></Title>
          </div>
        </div>
        <div className={styles.page__contents__loginBox}>
          <div className={styles.page__contents__loginBox__label}>아이디</div>
          <InputBox placeHolder={"아이디를 입력하세요"} handleData={setId}></InputBox>
          <div className={styles.page__contents__loginBox__label}>비밀번호</div>
          <InputBox placeHolder={"비밀번호를 입력하세요"} handleData={setPw}></InputBox>
          <div className={styles.page__contents__loginBox__button}>
            <Button text={"로그인"} data={[id, pw]} onClick={handleLogin}></Button>
            <Link to={"/register"}>
              <Button text={"회원가입"} data={null}></Button>
            </Link>
          </div>
          <Link to={"/recall"}>
            <div className={styles.page__contents__loginBox__forget}>아이디/비밀번호를 잊으셨나요?</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
