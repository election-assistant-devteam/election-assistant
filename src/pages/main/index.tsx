import React, { useState } from "react";
import styles from "./styles/main.module.scss";
import MenuView from "./menuview/index";
import CenterView from "./centerview/index";
import PersonalView from "./personalview/index";
import { AnimatePresence, motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function index() {
  const [viewNum, setViewNum] = useState(2);

  const getAnimation = () => {
    switch (viewNum) {
      case 0:
        return {
          initial: { x: "-100%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: "-100%", opacity: 0 },
        };
      case 1:
        return {
          // initial: { scale: 0.5, opacity: 0 },
          // animate: { scale: 1, opacity: 1 },
          // exit: { scale: 0.5, opacity: 0 },
          initial: { y: "-100%", opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: "-100%", opacity: 0 },
        };
      case 2:
        return {
          initial: { x: "100%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: "100%", opacity: 0 },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
        };
    }
  };

  const renderView = () => {
    switch (viewNum) {
      case 0:
        return <MenuView view={viewNum} handleView={setViewNum} />;
      case 1:
        return <CenterView view={viewNum} handleView={setViewNum} />;
      case 2:
        return <PersonalView view={viewNum} handleView={setViewNum}></PersonalView>;
      default:
        return <p>잘못된 viewNum입니다.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div key={viewNum} initial={getAnimation().initial} animate={getAnimation().animate} exit={getAnimation().exit} transition={{ duration: 0.5 }} className={styles.viewContainer}>
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default index;
