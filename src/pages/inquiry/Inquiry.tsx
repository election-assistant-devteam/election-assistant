import React, { useState } from "react";
import styles from "./styles/inquiry.module.scss";
import NavBar from "@/components/common/navigation/NavBar";

function Inquiry() {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState<boolean>(true);

  const checkFormat = (event) => {
    const email = event.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailValidation(false);
    } else {
      setEmailValidation(true);
    }
    return;
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value); // 사용자가 입력한 값을 상태에 반영
  };

  const handleContents = (event) => {
    const inputText = event.target.value;

    if (inputText.length > 1000) {
      return;
    }
    setText(inputText);
    setCharCount(inputText.length);
  };

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const sendInquiry = async () => {
    const response = await fetch(
      "https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/inquiry",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          category: selectedCategory,
          text: text,
        }),
      }
    );

    if (response.status === 200) {
      alert("문의 전송이 완료되었습니다!");
      // const result = await response.json();
    } else {
      alert("문의 전송과정에서 오류가 있습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.page}>
      {/* <NavBar text="1:1 문의"></NavBar> */}
      <div className={styles.page__contents}>
        <div className={styles.page__contents__emailSection}>
          <div className={styles.page__contents__emailSection__head}>답변 받으실 이메일</div>
          <div className={styles.page__contents__emailSection__body}>
            <input
              style={{ color: emailValidation ? "black" : "red" }}
              onBlur={checkFormat}
              onFocus={() => setEmailValidation(true)}
              type="text"
              placeholder="email@example.com"
              className={styles.page__contents__emailSection__body__input}
              value={emailValidation ? email : "올바른 이메일 형식이 아닙니다"}
              onChange={handleEmailInput}
            />
          </div>
        </div>
        <div className={styles.page__contents__categorySection}>
          <div className={styles.page__contents__categorySection__head}>문의유형</div>
          <div className={styles.page__contents__categorySection__body}>
            <select
              value={selectedCategory}
              onChange={handleCategory}
              name=""
              id=""
              className={styles.page__contents__categorySection__body__comboBox}
            >
              <option value="" disabled>
                카테고리 선택
              </option>
              <option value="bug">버그/에러 문의</option>
              <option value="improvement">시스템 개선사항 건의</option>
              <option value="report">악의적 유저 신고</option>
              <option value="other">기타</option>
            </select>
          </div>
        </div>
        <div className={styles.page__contents__contentSection}>
          <div className={styles.page__contents__contentSection__head}>문의내용</div>
          <textarea
            placeholder="내용을 입력하세요"
            value={text}
            className={styles.page__contents__contentSection__body}
            onChange={handleContents}
          ></textarea>
          <div className={styles.page__contents__contentSection__tail}>{charCount}/1000</div>
          <button className={styles.page__contents__contentSection__button} onClick={sendInquiry}>
            문의하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inquiry;
