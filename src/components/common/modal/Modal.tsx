import { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { GiCancel } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { apiCall } from "@/services/authServices";

interface Props {
  type: string;
  available: (bool: boolean) => void;
  data: (arg: string) => void;
}

function Modal({ type, available, data }: Props) {
  const [partyArray, setPartyArray] = useState<string[]>();
  const [politicianArray, setPoliticianArray] = useState<string[]>();
  const [inputValidity, setInputValidity] = useState<boolean>(true);
  const POLITICIAN_PATH = "/politicians";
  const PARTY_PATH = "/parties";

  useEffect(() => {
    const getData = async () => {
      if (type === "정당") {
        const response = await apiCall(PARTY_PATH, "GET");
        setPartyArray(response.data);
      } else if (type === "정치인") {
        const response = await apiCall(POLITICIAN_PATH, "GET");

        setPoliticianArray(response.data);
      } else {
        console.error("modal type error");
      }
    };
    getData();
  }, []);

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
    //input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (event.key === "ArrowDown" && dropDownList.length - 1 > dropDownItemIndex) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
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
            <div
              className={styles.page__contents__head__titleBox__title}
            >{`관심 ${type} 수정`}</div>
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
            <FaSearch
              size="25"
              color="#21005d"
              className={styles.page__contents__head__inputBox__icon}
            ></FaSearch>
          </div>
          {isHaveInputValue && (
            <div className={styles.page__contents__head__dropDownBox}>
              {dropDownList.length === 0 && (
                <div className={styles.page__contents__head__dropDownBox__dropDownItem}>
                  해당하는 값이 없습니다
                </div>
              )}
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
              if (isHaveInputValue && dropDownList.length === 0) {
                return;
              }
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
