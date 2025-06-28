import { useState } from "react";
import styles from "./DetailInfoContainer.module.scss";
import Specview from "../specview";
import CategoryButton from "./CategoryButton";

interface Props {
  data: any;
}

const DetailInfoContainer = ({ data }: Props) => {
  const [viewNum, setViewNum] = useState(0);
  const categoryArray = [
    { index: 0, label: "학력" },
    { index: 1, label: "경력" },
    { index: 2, label: "범죄이력" },
    { index: 3, label: "공약" },
    { index: 4, label: "국무수행능력" },
    { index: 5, label: "지지율" },
  ];

  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const [curPos, setCurPos] = useState(0);
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
  return (
    <div className={styles.infoBox}>
      <div
        className={styles.infoBox__categoryBox}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className={styles.infoBox__categoryBox__window}
          style={{
            transform: `translateX(-${curPos}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {categoryArray.map((item, index) => (
            <CategoryButton
              label={item.label}
              viewNum={viewNum}
              setViewNum={setViewNum}
              index={item.index}
            />
          ))}
        </div>
      </div>
      <div className={styles.infoBox__view}>
        {data ? <Specview viewNum={viewNum} data={data}></Specview> : "로딩 중..."}
      </div>
    </div>
  );
};

export default DetailInfoContainer;
