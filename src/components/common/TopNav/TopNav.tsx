import React, { useEffect, useRef, useState } from "react";
import styles from "./TopNav.module.scss";
import { useRecoilState } from "recoil";
import { curMainNum } from "@/recoil/atoms/curMainNum";
import { IoDocumentText, IoDocumentTextOutline } from "react-icons/io5";
import { GoHome, GoHomeFill } from "react-icons/go";
import { MdOutlinePerson, MdPerson } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { prevMainNum } from "@/recoil/atoms/prevMainNum";

const TopNav = () => {
  const [curView, setCurView] = useRecoilState(curMainNum);
  const [prevView, setPrevView] = useRecoilState(prevMainNum);
  const [visible, setVisible] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const node = document.getElementById("pageContents");
    if (!node) return;
    const handleScroll = () => {
      const currentScrollY = node.scrollTop;
      if (currentScrollY <= 5) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
      // console.log(currentScrollY);
    };
    node.addEventListener("scroll", handleScroll);
    return () => node.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 100,
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.navBox}>
            <div
              className={styles.navBox__button}
              onClick={() => {
                setPrevView(curView);
                setCurView(0);
              }}
            >
              {curView === 0 ? (
                <>
                  <IoDocumentText size="20" color="#21005d" />
                  <div className={styles.navBox__button__text}>메뉴</div>
                </>
              ) : (
                <>
                  <IoDocumentTextOutline size="20" color="#21005d" />
                  <div className={styles.navBox__button__text}>메뉴</div>
                </>
              )}
            </div>
            <div
              className={styles.navBox__button}
              onClick={() => {
                setPrevView(curView);
                setCurView(1);
              }}
            >
              {curView === 1 ? (
                <>
                  <GoHomeFill size="20" color="#21005d" />
                  <div className={styles.navBox__button__text}>홈화면</div>
                </>
              ) : (
                <>
                  <GoHome size="20" color="#21005d" />
                  <div className={styles.navBox__button__text}>홈화면</div>
                </>
              )}
            </div>
            <div
              className={styles.navBox__button}
              onClick={() => {
                setPrevView(curView);
                setCurView(2);
              }}
            >
              {curView === 2 ? (
                <>
                  <MdPerson size="20" color="#21005d" />
                  <div className={styles.navBox__button__text}>마이페이지</div>
                </>
              ) : (
                <>
                  <MdOutlinePerson size="20" color="#21005d" />
                  <div className={styles.navBox__button__text}>마이페이지</div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopNav;
