import { useMemo } from "react";
import styles from "./styles/MainPage.module.scss";
import MenuView from "./menuview/MenuView";
import CenterView from "./centerview/CenterView";
import PersonalView from "./personalview/PersonalView";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { curMainNum } from "@/recoil/atoms/curMainNum";
import { prevMainNum } from "@/recoil/atoms/prevMainNum";
import { useNavigate } from "react-router-dom";

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

function MainPage() {
  const [prevView, setPrevView] = useRecoilState(prevMainNum);
  const [curView, setCurView] = useRecoilState(curMainNum);
  const navigate = useNavigate();
  const direction = useMemo(() => (curView > prevView ? 1 : -1), [curView, prevView]);

  const renderView = () => {
    // console.log(curView);
    switch (curView) {
      case 0:
        return <MenuView />;
      case 1:
        return <CenterView />;
      case 2:
        if (sessionStorage.getItem("access-token") === null) {
          alert("로그인이 필요합니다!");
          setCurView(1);
          navigate("/login");
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
    </div>
  );
}

export default MainPage;
