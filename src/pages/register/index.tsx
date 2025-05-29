import React, { useEffect, useState } from "react";
import styles from "./styles/register.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import InputBox from "@/components/common/input/InputBox";
import Button from "@/components/common/button/Button";
import RegisterSuccess from "./registersuccess";
import Popup from "@/components/common/popup/Popup";
import { formatChecker } from "@/utils/formatChecker";
import { apiCall } from "@/services/authServices";

const ID_REGEX = /^[a-zA-Z0-9]{4,12}$/;
const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,12}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENDPOINT = "http://54.180.165.220/api/users";
//hello

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
  const [alertMsg, setAlertMsg] = useState<string>();

  const handleRegister = async () => {
    // 모든 필드에 입력되었는지 여부 체크
    if (
      id === undefined ||
      pw === undefined ||
      email === undefined ||
      nickname === undefined ||
      pwRepeat === undefined
    ) {
      alert("모든 항목에 대해 입력하세요!");
      return;
    }

    const isIdValid = formatChecker(id, ID_REGEX);
    const isPwValid = formatChecker(pw, PW_REGEX);
    const isEmailValid = formatChecker(email, EMAIL_REGEX);
    const isPwRepeatValid = pw === pwRepeat ? true : false;

    if (!isEmailValid || !isIdValid || !isPwValid || !isPwRepeatValid) {
      return;
    }

    const payload = {
      nickname: nickname,
      email: email,
      username: id,
      password: pw,
    };

    try {
      const result = await apiCall(ENDPOINT, "POST", payload);

      if (result.code === 20000) {
        if (result.success === true) {
          setSuccess(true);
        } else if (result.success === false) {
          alert(result.message);
        }
      } else if (result.code === 40000) {
        setAlertMsg(result.message);
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
              <div className={emailValidation ? styles.noErrorMsg : styles.errorMsg}>
                이메일 형식이 올바르지 않습니다
              </div>
            </div>
            <div className={styles.page__contents__inputBox__nicknameBox}>
              <div className={styles.label}>닉네임</div>
              <InputBox placeHolder={"닉네임을 입력하세요"} handleData={setNickname} />
              <div className={styles.noErrorMsg}></div>
            </div>
            <div className={styles.page__contents__inputBox__idBox}>
              <div className={styles.label}>아이디</div>
              <InputBox placeHolder={"아이디를 입력하세요"} handleData={setId} />
              <div className={idValidation ? styles.noErrorMsg : styles.errorMsg}>
                아이디 형식이 올바르지 않습니다 (4~12자 영문자 또는 숫자)
              </div>
            </div>
            <div className={styles.page__contents__inputBox__pwBox}>
              <div className={styles.label}>비밀번호</div>
              <InputBox placeHolder={"비빈번호를 입력하세요"} handleData={setPw} />
              <div className={pwValidation ? styles.noErrorMsg : styles.errorMsg}>
                비밀번호 형식이 올바르지 않습니다 (9~12자 영문자, 숫자 조합)
              </div>
            </div>
            <div className={styles.page__contents__inputBox__pwCheckBox}>
              <div className={styles.label}>비밀번호 확인</div>
              <InputBox placeHolder={"비밀번호를 다시 한번 입력하세요"} handleData={setPwRepeat} />
              <div className={pwRepeatValidation ? styles.noErrorMsg : styles.errorMsg}>
                비밀번호와 같지 않습니다
              </div>
            </div>
          </div>
          <div className={styles.page__contents__buttonBox}>
            <Button text={"회원가입"} data={null} onClick={handleRegister} />
          </div>
          <Popup text={alertMsg} className={styles.popup}></Popup>
        </div>
      )}
    </div>
  );
}

export default index;
