import React, { useState } from "react";
import styles from "./styles/PwView.module.scss";
import InputBox from "@/components/common/input/InputBox";
import Button from "@/components/common/button/Button";
import { apiCall } from "@/services/authServices";

const RANDOM_PW_ENDPOINT = "https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/recall/pw";

function index() {
  const [id, setId] = useState<string>();
  const [email, setEmail] = useState<string>();

  const getRandomPw = async () => {
    const data = {
      id: id,
      email: email,
    };

    const result = await apiCall(RANDOM_PW_ENDPOINT, "POST", data);

    if (result.code === 20000) {
      alert(`비밀번호가 재발급 되었습니다. 이메일을 확인하세요!`);
    } else {
      alert("서버 에러... 나중에 다시 시도하세요");
    }
  };

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
        <Button text={"비밀번호 찾기"} onClick={getRandomPw}></Button>
      </div>
    </div>
  );
}

export default index;
