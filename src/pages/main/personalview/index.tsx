import React from "react";
import styles from "./styles/personalview.module.scss";
import BotNav from "@/components/common/botnav/BotNav";

interface Props {
  view: number;
  handleView: (viewNum: number) => void;
}

function index({ view, handleView }: Props) {
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__profileSection}>
          <div className={styles.page__contents__profileSection__name}>길동님</div>
          <div className={styles.page__contents__profileSection__prefer}>
            <div className={styles.page__contents__profileSection__prefer__party}>
              <div className={styles.page__contents__profileSection__prefer__party__label}>선호 정당</div>
              <div className={styles.page__contents__profileSection__prefer__party__data}>무슨무슨당</div>
            </div>
            <div className={styles.page__contents__profileSection__prefer__politician}>
              <div className={styles.page__contents__profileSection__prefer__politician__label}>선호 정치인</div>
              <div className={styles.page__contents__profileSection__prefer__politician__label}>봉길창</div>
            </div>
          </div>
          <div className={styles.page__contents__profileSection__status}>
            <div className={styles.page__contents__profileSection__status__post}>
              <div className={styles.page__contents__profileSection__status__post__totalCount}>내가쓴글 8개</div>
              <div className={styles.page__contents__profileSection__status__post__viewAll}>전체보기</div>
            </div>
            <div className={styles.page__contents__profileSection__status__donate}>
              <div className={styles.page__contents__profileSection__status__donate__totalCount}>후원중인 정치인 8명</div>
              <div className={styles.page__contents__profileSection__status__donate__viewAll}>전체보기</div>
            </div>
          </div>
        </div>
        <BotNav view={view} handleView={handleView}></BotNav>
      </div>
    </div>
  );
}

export default index;
