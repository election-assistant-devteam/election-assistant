import React, { useEffect, useState } from "react";
import styles from "./styles/register.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import InputBox from "@/components/common/input/InputBox";
import Button from "@/components/common/button/Button";
import RegisterSuccess from "./registersuccess";

function index() {
  const [email, setEmail] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();
  const [pwRepeat, setPwRepeat] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [idValidation, setIdValidation] = useState<boolean>(true);
  const [pwValidation, setPwValidation] = useState<boolean>(true);
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [pwRepeatValidation, setPwRepeatValidation] = useState<boolean>(true);

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

  const emailFormatCheck = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
    return;
  };

  const pwRepeatCheck = (pw: string, pwRepeat: string) => {
    if (pw !== pwRepeat) {
      setPwRepeatValidation(false);
    } else {
      setPwRepeatValidation(true);
    }
  };

  const handleRegister = async () => {
    if (id === undefined || pw === undefined || email === undefined || nickname === undefined || pwRepeat === undefined) {
      alert("모든 항목에 대해 입력하세요!");
      return;
    }
    emailFormatCheck(email);
    idFormatCheck(id);
    pwFormatCheck(pw);
    pwRepeatCheck(pw, pwRepeat);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isIdValid = /^[a-zA-Z0-9]{4,12}$/.test(id);
    const isPwValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pw);
    const isPwRepeatValid = pw === pwRepeat ? true : false;
    if (!isEmailValid || !isIdValid || !isPwValid || !isPwRepeatValid) {
      return;
    }

    const payload = {
      email: email,
      id: id,
      pw: pw,
    };

    try {
      const response = await fetch("https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/register/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.status === 201) {
        console.log(data);
        setSuccess(true);
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      console.error("오류 발생: ", error);
    }
  };

  return (
    <div className={styles.page}>
      {success ? (
        <RegisterSuccess />
      ) : (
        <div className={styles.page__contents}>
          <NavBar text={"회원가입"} />
          <div className={styles.page__contents__inputBox}>
            <div className={styles.page__contents__inputBox__emailBox}>
              <div className={styles.label}>이메일</div>
              <InputBox placeHolder={"이메일을 입력하세요"} handleData={setEmail} />
              <div className={emailValidation ? styles.noErrorMsg : styles.errorMsg}>이메일 형식이 올바르지 않습니다</div>
            </div>
            <div className={styles.page__contents__inputBox__nicknameBox}>
              <div className={styles.label}>닉네임</div>
              <InputBox placeHolder={"닉네임을 입력하세요"} handleData={setNickname} />
            </div>
            <div className={styles.page__contents__inputBox__idBox}>
              <div className={styles.label}>아이디</div>
              <InputBox placeHolder={"아이디를 입력하세요"} handleData={setId} />
              <div className={idValidation ? styles.noErrorMsg : styles.errorMsg}>아이디 형식이 올바르지 않습니다 (4~12자 영문자 또는 숫자)</div>
            </div>
            <div className={styles.page__contents__inputBox__pwBox}>
              <div className={styles.label}>비밀번호</div>
              <InputBox placeHolder={"비빈번호를 입력하세요"} handleData={setPw} />
              <div className={pwValidation ? styles.noErrorMsg : styles.errorMsg}>비밀번호 형식이 올바르지 않습니다 (9~12자 영문자, 숫자, 특수문자 조합)</div>
            </div>
            <div className={styles.page__contents__inputBox__pwCheckBox}>
              <div className={styles.label}>비밀번호 확인</div>
              <InputBox placeHolder={"비밀번호를 다시 한번 입력하세요"} handleData={setPwRepeat} />
              <div className={pwRepeatValidation ? styles.noErrorMsg : styles.errorMsg}>비밀번호와 같지 않습니다</div>
            </div>
          </div>
          <div className={styles.page__contents__buttonBox}>
            <Button text={"회원가입"} data={null} onClick={handleRegister} />
          </div>
        </div>
      )}
    </div>
  );
}

export default index;
