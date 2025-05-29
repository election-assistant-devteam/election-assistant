import React, { useState } from "react";
import styles from "./styles/IdView.module.scss";
import Button from "@/components/common/button/Button";
import InputBox from "@/components/common/input/InputBox";
import { apiCall } from "@/services/authServices";

const AUTH_NUM_REQ_ENDPOINT =
  "https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/authnumreq";
const AUTH_NUM_CONFIRM_ENDPOINT =
  "https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/authnumval";

function index() {
  const [email, setEmail] = useState<string>();
  const [verifycode, setVerifycode] = useState<string>();
  const [id, setId] = useState<string>();

  const authNumReq = async () => {
    const data = { email: email };
    const result = await apiCall(AUTH_NUM_REQ_ENDPOINT, "POST", data);

    if (result.code === 20000) {
      alert("이메일로 인증번호가 전송되었습니다");
    } else {
      alert("서버 에러... 나중에 다시 시도하세요");
    }
  };

  const authNumVal = async () => {
    const data = { verifycode: verifycode };
    const result = await apiCall(AUTH_NUM_CONFIRM_ENDPOINT, "POST", data);

    if (result.code === 20000) {
      setId(result.data.id);
      alert("인증번호가 확인되었습니다");
    } else {
      alert("인증번호가 올바르지 않습니다");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__inputSection}>
          <div className={styles.page__contents__inputSection__email}>
            <InputBox placeHolder={"이메일을 입력하세요"} handleData={setEmail}></InputBox>
            <button className={styles.button} onClick={() => authNumReq()}>
              인증번호
            </button>
          </div>
          <div className={styles.page__contents__inputSection__verification}>
            <InputBox placeHolder={"인증번호 입력"} handleData={setVerifycode}></InputBox>
            <button className={styles.button} onClick={() => authNumVal()}>
              확인
            </button>
          </div>
        </div>
        <Button
          text={"아이디 찾기"}
          onClick={() => {
            alert(`아이디는 ${id} 입니다`);
          }}
        ></Button>
      </div>
    </div>
  );
}

export default index;
