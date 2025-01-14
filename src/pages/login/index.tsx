import React, { useEffect, useState } from "react";
import styles from "./styles/login.module.scss";
import Title from "@/components/common/title/Title";
import Button from "@/components/common/button/Button";
import InputBox from "@/components/common/input/InputBox";
import { Link, useNavigate } from "react-router-dom";

function index() {
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();
  const navigate = useNavigate();
  const [idValidation, setIdValidation] = useState<boolean>(true);
  const [pwValidation, setPwValidation] = useState<boolean>(true);

  const idFormatCheck = (id: string) => {
    const regex = /^[a-zA-Z0-9]{4,12}$/;
    if (!regex.test(id)) {
      setIdValidation(false);
    } else {
      setIdValidation(true);
    }
    return;
  };

  const pwFormatCheck = (pw: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,12}$/;
    if (!regex.test(pw)) {
      setPwValidation(false);
    } else {
      setPwValidation(true);
    }
    return;
  };

  // useEffect(() => {

  // }, [idValidation, pwValidation]);

  const handleLogin = async () => {
    if (id === undefined || pw === undefined) {
      alert("아이디나 패스워드를 입력하세요!");
      return;
    }
    idFormatCheck(id);
    pwFormatCheck(pw);
    const isIdValid = /^[a-zA-Z0-9]{4,12}$/.test(id); // id 유효성 체크
    const isPwValid = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,12}$/.test(pw); // pw 유효성 체크

    if (!isIdValid || !isPwValid) {
      return;
    }

    const response = await fetch("https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/login/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        pw: pw,
      }),
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
          <div className={idValidation ? styles.noErrorMsg : styles.errorMsg}>아이디 형식이 올바르지 않습니다 (4~12자 영문자 또는 숫자)</div>
          <div className={styles.page__contents__loginBox__label}>비밀번호</div>
          <InputBox placeHolder={"비밀번호를 입력하세요"} handleData={setPw}></InputBox>
          <div className={pwValidation ? styles.noErrorMsg : styles.errorMsg}>비밀번호 형식이 올바르지 않습니다 (9~12자 영문자, 숫자, 특수문자 조합)</div>
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
