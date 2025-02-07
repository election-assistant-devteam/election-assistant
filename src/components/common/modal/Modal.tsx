import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { GiCancel } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";

interface Props {
  type: string;
  available: (bool: boolean) => void;
  data: (arg: string) => void;
}

function Modal({ type, available, data }: Props) {
  const partyArray = ["더불어민주당", "국민의힘", "정의당", "기본소득당", "진보당", "녹색당", "우리공화당", "민생당", "개혁신당", "조국혁신당"];
  const politicianArray = [
    "윤석열",
    "이재명",
    "한동훈",
    "김기현",
    "이정미",
    "심상정",
    "김재연",
    "용혜인",
    "조국",
    "허은아",
    "김동연",
    "오세훈",
    "박영선",
    "안철수",
    "유승민",
    "홍준표",
    "박지원",
    "김부겸",
    "정세균",
    "황교안",
    "김종인",
    "박근혜",
    "문재인",
    "이명박",
    "노무현",
    "김대중",
    "김영삼",
    "전두환",
    "노태우",
    "박정희",
  ];
  const sampleArray = type === "정당" ? partyArray : politicianArray;

  const [inputValue, setInputValue] = useState("");
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(sampleArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const showDropDownList = () => {
    if (inputValue === "") {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = sampleArray.filter((textItem) => textItem.includes(inputValue));
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event) => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
  };

  const handleDropDownKey = (event) => {
    // console.log(event);
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (event.key === "ArrowDown" && dropDownList.length - 1 > dropDownItemIndex) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0) setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [inputValue]);

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__head}>
          <div className={styles.page__contents__head__titleBox}>
            <div className={styles.page__contents__head__titleBox__title}>{`관심 ${type} 수정`}</div>
            <GiCancel
              color="#21005d"
              size="30"
              className={styles.page__contents__head__titleBox__icon}
              onClick={() => {
                available(false);
              }}
            />
          </div>
          <div className={styles.page__contents__head__inputBox}>
            <input
              type="text"
              placeholder={`검색할 ${type}을 입력하세요`}
              value={inputValue}
              onChange={changeInputValue}
              onKeyUp={handleDropDownKey}
              className={styles.page__contents__head__inputBox__input}
            />
            <FaSearch size="25" color="#21005d" className={styles.page__contents__head__inputBox__icon}></FaSearch>
          </div>
          {isHaveInputValue && (
            <div className={styles.page__contents__head__dropDownBox}>
              {dropDownList.length === 0 && <div className={styles.page__contents__head__dropDownBox__dropDownItem}>해당하는 값이 없습니다</div>}
              {dropDownList.map((dropDownItem, dropDownIndex) => {
                return (
                  <div
                    className={
                      dropDownItemIndex === dropDownIndex
                        ? `${styles.page__contents__head__dropDownBox__dropDownItem} ${styles.active}`
                        : `${styles.page__contents__head__dropDownBox__dropDownItem}`
                    }
                    key={dropDownIndex}
                    onClick={() => clickDropDownItem(dropDownItem)}
                    onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  >
                    {dropDownItem}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.page__contents__tail}>
          <button
            className={styles.page__contents__tail__button}
            onClick={() => {
              data(inputValue);
              available(false);
            }}
          >
            관심 {type}으로 선택하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
