import React, { useState } from "react";
import styles from "./styles/register.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import InputBox from "@/components/common/input/InputBox";
import Button from "@/components/common/button/Button";
import RegisterSuccess from "./registersuccess";

function index() {
  const [email, setEmail] = useState<string>();
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();
  const [pwCheck, setPwCheck] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);

  const handleRegister = async () => {
    if (pw !== pwCheck) {
      alert("비밀번호가 일치하지 않습니다.");
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
            </div>
            <div className={styles.page__contents__inputBox__idBox}>
              <div className={styles.label}>아이디</div>
              <InputBox placeHolder={"아이디를 입력하세요"} handleData={setId} />
            </div>
            <div className={styles.page__contents__inputBox__pwBox}>
              <div className={styles.label}>비밀번호</div>
              <InputBox placeHolder={"비빈번호를 입력하세요"} handleData={setPw} />
            </div>
            <div className={styles.page__contents__inputBox__pwCheckBox}>
              <div className={styles.label}>비밀번호 확인</div>
              <InputBox placeHolder={"비밀번호를 다시 한번 입력하세요"} handleData={setPwCheck} />
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
