import React, { useState } from "react";
import styles from "./styles/recall.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import IdView from "./ideview";
import PwView from "./pwview";

function index() {
  const [currentView, setCurrentView] = useState("id");
  const showidView = () => setCurrentView("id");
  const showpwView = () => setCurrentView("pw");

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <NavBar text={"아이디 / 비밀번호 찾기"}></NavBar>
        <div className={styles.page__contents__selectionBox}>
          <div className={currentView === "id" ? `${styles.page__contents__selectionBox__id} ${styles.active}` : `${styles.page__contents__selectionBox__id} ${styles.inactive}`} onClick={showidView}>
            아이디 찾기
          </div>
          <div className={currentView === "pw" ? `${styles.page__contents__selectionBox__pw} ${styles.active}` : `${styles.page__contents__selectionBox__pw} ${styles.inactive}`} onClick={showpwView}>
            비밀번호 찾기
          </div>
        </div>
        {currentView === "id" && <IdView></IdView>}
        {currentView === "pw" && <PwView></PwView>}
      </div>
    </div>
  );
}

export default index;
