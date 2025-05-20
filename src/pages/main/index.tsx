import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles/main.module.scss";
import MenuView from "./menuview/index";
import CenterView from "./centerview/CenterView";
import PersonalView from "./personalview/index";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { curMainNum } from "@/recoil/atoms/curMainNum";
import { prevMainNum } from "@/recoil/atoms/prevMainNum";

import { useNavigate } from "react-router-dom";
import Popup from "@/components/common/popup/Popup";

const variants = {
  initial: (direction: number) => ({
    x: direction === 1 ? "100%" : "-100%",
    opacity: 1,
  }),
  animate: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction === 1 ? "-100%" : "100%",
    opacity: 1,
  }),
};

function index() {
  const [prevView, setPrevView] = useRecoilState(prevMainNum);
  const [curView, setCurView] = useRecoilState(curMainNum);
  const navigate = useNavigate();
  const direction = useMemo(() => (curView > prevView ? 1 : -1), [curView, prevView]);

  // console.log("--------------------");
  // console.log("prevView:", prevView);
  // console.log("curView:", curView);
  // console.log("direction : ", direction);
  // console.log("--------------------");

  // const getAnimation = () => {
  //   return {
  //     initial: prevView > curView ? { x: "-100%", opacity: 0 } : { x: "100%", opacity: 0 },
  //     animate: { x: 0, opacity: 1 },
  //     exit: prevView > curView ? { x: "100%", opacity: 0 } : { x: "-100%", opacity: 0 },
  //   };
  // };

  const renderView = () => {
    console.log(curView);
    switch (curView) {
      case 0:
        return <MenuView />;
      case 1:
        return <CenterView />;
      case 2:
        console.log(sessionStorage.getItem("access-token"));
        if (sessionStorage.getItem("access-token") === null) {
          alert("로그인이 필요합니다!");
          setCurView(1);
          navigate("/login");
          // setCurView(prevView);
          // return renderView();
          return;
        }
        return <PersonalView />;
      default:
        return <p>잘못된 viewNum입니다.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <AnimatePresence custom={direction}>
        <motion.div
          key={curView}
          variants={variants}
          custom={direction}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className={styles.viewContainer}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
      {/* {renderView()} */}
    </div>
  );
}

export default index;
