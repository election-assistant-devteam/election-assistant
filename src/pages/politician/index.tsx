import React, { useEffect, useState } from "react";
import styles from "./styles/politician.module.scss";
import { useParams } from "react-router-dom";
import Specview from "./specview/index";
import NavBar from "@/components/common/navigation/NavBar";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { apiCall } from "@/services/authServices";
import DataCard from "./DataCard";

function PoliticianInfo() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [viewNum, setViewNum] = useState(0);

  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [curPos, setCurPos] = useState(0);
  // const [curPos, setCurPos] = useState(0);

  // const ENDPOINT = `https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/politician/${params.id}`;
  const ENDPOINT = `http://localhost:9001/politicians/${params.id}/detail`;

  /*지켜보기 기능*/
  const [observe, setObserve] = useState<boolean>(false);
  const [isThrottled, setIsThrottled] = useState(false); //서버부하줄이기 위한 쓰로틀링기능

  /** 스와이프 기능 **/
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setEndX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const swipeDistance = startX - endX;
    const width = e.currentTarget.offsetWidth; //윈도우 크기
    const numOfElements = e.currentTarget.children[0].children.length; //카테고리 갯수
    const limitLen = e.currentTarget.children[0].children[0].offsetWidth; //카테고리 하나의 크기

    // console.log("limieLen:", limitLen);

    setCurPos((prevPos) => {
      const newPos = prevPos + swipeDistance;
      // console.log("width: ", width);
      // console.log("swipeDist:", swipeDistance);
      // console.log("newPos: ", newPos);
      // console.log("###", limitLen * numOfElements + 10 * (numOfElements - 1) - width);

      if (
        swipeDistance > 0 &&
        newPos > limitLen * numOfElements + 10 * (numOfElements - 1) - width
      ) {
        //좌측이동이고 새로운 이동거리가 하나의 요소조차 남기지 못하는 경우
        //하나의 요소만 남길수있을만큼만 이동함
        // return (numOfElements - 1) * limitLen + 10 * (numOfElements - 2) + 5;
        return limitLen * numOfElements + 10 * (numOfElements - 1) - width;
      }
      // 스와이프 범위를 제한 (예: 0 이상, 500px 이하)
      // setCurPos(-Math.max(0, Math.min(newMoveDist, 500)));
      // console.log("curPos: ", -Math.max(0, Math.min(newMoveDist, 500)));
      // console.log(Math.max(0, Math.min(newPos, 500)));
      return Math.max(0, Math.min(newPos, 500));
    });

    // 초기화
    setStartX(0);
    setEndX(0);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setStartX(e.clientX);
    setEndX(e.clientX);
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (e) => {
    // console.log(e.clientX);
    setEndX(e.clientX);
  };

  const handleMouseUp = (e) => {
    // console.log(startX, ",", endX);
    handleTouchEnd(e); // 동일한 로직 재사용
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  /**********************/

  const sendObserve = async () => {
    if (isThrottled) {
      alert("5초 후 다시 지켜보기 및 지켜보기 취소가 가능합니다");
      return;
    }
    if (!observe) {
      const response = await fetch(
        `https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/observe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            observe: true,
          }),
        }
      );

      if (response.status === 200) {
        // const result = await response.json();

        // console.log(result);
        // data = result.data;
        setObserve(true);
      } else {
        alert("서버 에러... 나중에 다시 시도하세요");
      }

      setIsThrottled(true);
    } else if (observe) {
      const response = await fetch(
        `https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/observe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            observe: false,
          }),
        }
      );

      if (response.status === 200) {
        // const result = await response.json();

        setObserve(false);
      } else {
        alert("서버 에러... 나중에 다시 시도하세요");
      }

      setIsThrottled(true);
    }

    setTimeout(() => {
      setIsThrottled(false); // 다시 요청 가능하도록 변경
    }, 5000);
  };

  useEffect(() => {
    // console.log(params);
    const getPoliticanData = async () => {
      const result = await apiCall(ENDPOINT, "GET");

      if (result.code === 20000) {
        console.log(result.message);
        console.log(result.data);
        setData(result.data);
      } else if (result.code === 40400) {
        console.log(result.message);
      }
    };
    getPoliticanData();
  }, []);

  return (
    <div className={styles.page}>
      <NavBar text={"후보자 상세보기"}></NavBar>

      <div className={styles.page__contents}>
        <div className={styles.page__contents__profileBox}>
          <div className={styles.page__contents__profileBox__profile}>
            {/* {data.map((item, index) => {
              <DataCard />
            })} */}
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>이름</div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>
                {data ? data.politicianName : "로딩 중..."}
              </div>
            </div>
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>나이</div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>
                {data ? data.age : "로딩 중..."}
              </div>
            </div>
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>
                거주지
              </div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>
                {data ? data.habitation : "로딩 중..."}
              </div>
            </div>
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>
                소속정당
              </div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>
                {data ? data.party : "로딩 중..."}
              </div>
            </div>
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>직업</div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>
                {data ? data.job : "로딩 중..."}
              </div>
            </div>
          </div>
          <div className={styles.page__contents__profileBox__imageSection}>
            <img
              src="/src/assets/images/sample-politician.png"
              alt=""
              className={styles.page__contents__profileBox__imageSection__image}
            />
            <MdOutlineRemoveRedEye
              size="30"
              className={
                observe
                  ? `${styles.page__contents__profileBox__imageSection__icon} ${styles.observe}`
                  : `${styles.page__contents__profileBox__imageSection__icon} ${styles.nonObserve}`
              }
              onClick={() => {
                sendObserve();
              }}
            />
          </div>
        </div>
        <div className={styles.page__contents__infoBox}>
          <div
            className={styles.page__contents__infoBox__categoryBox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div
              className={styles.page__contents__infoBox__categoryBox__window}
              style={{
                transform: `translateX(-${curPos}px)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div
                className={
                  viewNum === 0
                    ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}`
                    : styles.page__contents__infoBox__categoryBox__window__category
                }
                onClick={() => {
                  setViewNum(0);
                }}
              >
                학력
              </div>
              <div
                className={
                  viewNum === 1
                    ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}`
                    : styles.page__contents__infoBox__categoryBox__window__category
                }
                onClick={() => {
                  setViewNum(1);
                }}
              >
                경력
              </div>
              <div
                className={
                  viewNum === 2
                    ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}`
                    : styles.page__contents__infoBox__categoryBox__window__category
                }
                onClick={() => {
                  setViewNum(2);
                }}
              >
                범죄이력
              </div>
              <div
                className={
                  viewNum === 3
                    ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}`
                    : styles.page__contents__infoBox__categoryBox__window__category
                }
                onClick={() => {
                  setViewNum(3);
                }}
              >
                공약
              </div>
              {/* <div
                className={
                  viewNum === 4
                    ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}`
                    : styles.page__contents__infoBox__categoryBox__window__category
                }
                onClick={() => {
                  setViewNum(4);
                }}
              >
                국무수행능력
              </div>
              <div
                className={
                  viewNum === 5
                    ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}`
                    : styles.page__contents__infoBox__categoryBox__window__category
                }
                onClick={() => {
                  setViewNum(5);
                }}
              >
                지지율
              </div> */}
            </div>
          </div>
          <div className={styles.page__contents__infoBox__view}>
            {data ? <Specview viewNum={viewNum} data={data}></Specview> : "로딩 중..."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoliticianInfo;
