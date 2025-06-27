import React, { useEffect, useState } from "react";
import styles from "./styles/login.module.scss";
import Title from "@/components/common/title/Title";
import Button from "@/components/common/button/Button";
import InputBox from "@/components/common/input/InputBox";
import { Link, useNavigate } from "react-router-dom";
import Popup from "@/components/common/popup/Popup";
import { formatChecker } from "@/utils/formatChecker";
import { apiCall } from "@/services/authServices";

const ID_REGEX = /^[a-zA-Z0-9]{4,12}$/;
const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,12}$/;
// const ENDPOINT = "http://54.180.165.220/api/auth/login";
const PATH = "/auth/login";

function LoginPage() {
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();
  const navigate = useNavigate();
  const [idValidation, setIdValidation] = useState<boolean>(true);
  const [pwValidation, setPwValidation] = useState<boolean>(true);
  const [alertMsg, setAlertMsg] = useState<string>();

  const handleLogin = async () => {
    //아이디 & 비번 입력 여부 체크
    if (id === undefined || pw === undefined) {
      alert("아이디나 패스워드를 입력하세요!");
      return;
    }

    //유효성 검사 (동기적인 동작을 위해 로컬 변수에 검증 결과를 저장)
    const isIdValid = formatChecker(id, ID_REGEX);
    const isPwValid = formatChecker(pw, PW_REGEX);

    //화면에 에러 메시지 표시
    setIdValidation(isIdValid);
    setPwValidation(isPwValid);

    if (!isIdValid || !isPwValid) return;

    const data = { username: id, password: pw };
    const result = await apiCall(PATH, "POST", data);

    if (result.code === 20000) {
      sessionStorage.setItem("access-token", result.data.access);
      sessionStorage.setItem("refresh-token", result.data.refresh);
      sessionStorage.setItem("nickname", result.data.nickname);
      sessionStorage.setItem("id", result.data.id);
      sessionStorage.setItem("politicianOfInterest", result.data.politicianOfInterest);
      sessionStorage.setItem("partyOfInterest", result.data.partyOfInterest);
      navigate("/");
    } else if (result.code === 40400) {
      setAlertMsg(result.message);
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
          <div className={idValidation ? styles.noErrorMsg : styles.errorMsg}>
            아이디 형식이 올바르지 않습니다 (4~12자 영문자 또는 숫자)
          </div>
          <div className={styles.page__contents__loginBox__label}>비밀번호</div>
          <InputBox placeHolder={"비밀번호를 입력하세요"} handleData={setPw}></InputBox>
          <div className={pwValidation ? styles.noErrorMsg : styles.errorMsg}>
            비밀번호 형식이 올바르지 않습니다 (9~12자 영문자, 숫자 조합)
          </div>
          <div className={styles.page__contents__loginBox__button}>
            <Button text={"로그인"} data={[id, pw]} onClick={handleLogin}></Button>
            <Link to={"/register"}>
              <Button text={"회원가입"} data={null}></Button>
            </Link>
          </div>
          <Link to={"/recall"}>
            <div className={styles.page__contents__loginBox__forget}>
              아이디/비밀번호를 잊으셨나요?
            </div>
          </Link>
        </div>
        <Popup text={alertMsg} className={styles.popup}></Popup>
      </div>
    </div>
  );
}

export default LoginPage;
