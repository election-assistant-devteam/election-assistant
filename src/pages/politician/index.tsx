import React, { useEffect, useState } from "react";
import styles from "./styles/politician.module.scss";
import { useParams } from "react-router-dom";
import Specview from "./specview/index";
import NavBar from "@/components/common/navigation/NavBar";

function index() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [viewNum, setViewNum] = useState(0);
  // let data;

  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [curPos, setCurPos] = useState(0);
  // const [curPos, setCurPos] = useState(0);

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

      if (swipeDistance > 0 && newPos > limitLen * numOfElements + 10 * (numOfElements - 1) - width) {
        //좌측이동이고 새로운 이동거리가 하나의 요소조차 남기지 못하는 경우
        //하나의 요소만 남길수있을만큼만 이동함
        // return (numOfElements - 1) * limitLen + 10 * (numOfElements - 2) + 5;
        return limitLen * numOfElements + 10 * (numOfElements - 1) - width;
      }
      // 스와이프 범위를 제한 (예: 0 이상, 500px 이하)
      // setCurPos(-Math.max(0, Math.min(newMoveDist, 500)));
      // console.log("curPos: ", -Math.max(0, Math.min(newMoveDist, 500)));
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

  useEffect(() => {
    // console.log(params);
    const getPoliticanData = async () => {
      const response = await fetch(`https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/politician/${params.id}`, {
        method: "GET",
      });

      if (response.status === 200) {
        const result = await response.json();

        // console.log(result);
        // data = result.data;
        setData(result.data);
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
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>이름</div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>{data ? data.name : "로딩 중..."}</div>
            </div>
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>나이</div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>{data ? data.age : "로딩 중..."}</div>
            </div>
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>출생</div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>{data ? data.birth : "로딩 중..."}</div>
            </div>
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>거주지</div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>{data ? data.Residence : "로딩 중..."}</div>
            </div>
            <div className={styles.page__contents__profileBox__profile__dataBox}>
              <div className={styles.page__contents__profileBox__profile__dataBox__label}>가족</div>
              <div className={styles.page__contents__profileBox__profile__dataBox__data}>{data ? data.family : "로딩 중..."}</div>
            </div>
          </div>
          <div className={styles.page__contents__profileBox__image}>이미지</div>
        </div>
        <div className={styles.page__contents__infoBox}>
          <div className={styles.page__contents__infoBox__categoryBox} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <div className={styles.page__contents__infoBox__categoryBox__window} style={{ transform: `translateX(-${curPos}px)`, transition: "transform 0.3s ease-in-out" }}>
              <div
                className={viewNum === 0 ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}` : styles.page__contents__infoBox__categoryBox__window__category}
                onClick={() => {
                  setViewNum(0);
                }}
              >
                학력
              </div>
              <div
                className={viewNum === 1 ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}` : styles.page__contents__infoBox__categoryBox__window__category}
                onClick={() => {
                  setViewNum(1);
                }}
              >
                경력
              </div>
              <div
                className={viewNum === 2 ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}` : styles.page__contents__infoBox__categoryBox__window__category}
                onClick={() => {
                  setViewNum(2);
                }}
              >
                범죄이력
              </div>
              <div
                className={viewNum === 3 ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}` : styles.page__contents__infoBox__categoryBox__window__category}
                onClick={() => {
                  setViewNum(3);
                }}
              >
                공약
              </div>
              <div
                className={viewNum === 4 ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}` : styles.page__contents__infoBox__categoryBox__window__category}
                onClick={() => {
                  setViewNum(4);
                }}
              >
                국무수행능력
              </div>
              <div
                className={viewNum === 5 ? `${styles.page__contents__infoBox__categoryBox__window__category} ${styles.active}` : styles.page__contents__infoBox__categoryBox__window__category}
                onClick={() => {
                  setViewNum(5);
                }}
              >
                지지율
              </div>
            </div>
          </div>
          <div className={styles.page__contents__infoBox__view}>{data ? <Specview viewNum={viewNum} data={data}></Specview> : "로딩 중..."}</div>
        </div>
      </div>
    </div>
  );
}

export default index;
