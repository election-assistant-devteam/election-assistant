//import React from "react";
import styles from "./styles/news.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import { useLocation } from "react-router-dom";

function NewsPage() {
  const { state } = useLocation();

  return (
    <div className={styles.page}>
      <NavBar text="뉴스"></NavBar>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__newsContainer}>
          <div className={styles.page__contents__newsContainer__head}>최신 정치뉴스</div>
          <div className={styles.page__contents__newsContainer__body}>
            {state.map((event, index) => (
              <div
                key={index}
                className={styles.page__contents__newsContainer__body__item}
                onClick={() => window.open(state[index].link)}
              >
                <img
                  src={state?.[index]?.image}
                  alt=""
                  className={styles.page__contents__newsContainer__body__item__image}
                />
                <div className={styles.page__contents__newsContainer__body__item__title}>
                  {state[index].title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
