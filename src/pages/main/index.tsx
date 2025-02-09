import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles/main.module.scss";
import MenuView from "./menuview/index";
import CenterView from "./centerview/index";
import PersonalView from "./personalview/index";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { curMainNum } from "@/recoil/atoms/curMainNum";
import { prevMainNum } from "@/recoil/atoms/prevMainNum";

import { useNavigate } from "react-router-dom";

function index() {
  const [prevView, setPrevView] = useRecoilState(prevMainNum);
  const [curView, setCurView] = useRecoilState(curMainNum);

  // console.log("--------------------");
  // console.log("prevView:", prevView);
  // console.log("curView:", curView);
  // console.log("--------------------");

  // const getAnimation = () => {
  //   return {
  //     initial: prevView > curView ? { x: "-100%", opacity: 0 } : { x: "100%", opacity: 0 },
  //     animate: { x: 0, opacity: 1 },
  //     exit: prevView > curView ? { x: "100%", opacity: 0 } : { x: "-100%", opacity: 0 },
  //   };
  // };

  const renderView = () => {
    switch (curView) {
      case 0:
        return <MenuView />;
      case 1:
        return <CenterView />;
      case 2:
        return <PersonalView></PersonalView>;
      default:
        return <p>잘못된 viewNum입니다.</p>;
    }
  };

  return (
    <div className={styles.container}>
      {/* <AnimatePresence mode="wait">
        <motion.div
          key={curView}
          initial={getAnimation().initial}
          animate={getAnimation().animate}
          exit={getAnimation().exit}
          transition={{ duration: 0.5 }}
          className={styles.viewContainer}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence> */}
      {renderView()}
    </div>
  );
}

export default index;
