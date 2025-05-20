import React, { useEffect, useState } from "react";
import styles from "./styles/centerview.module.scss";
import BotNav from "@/components/common/botnav/BotNav";
import { useNavigate } from "react-router-dom";
import AutoCarousel from "@/components/common/AutoCarousel/AutoCarousel";
import CalendarButton from "./CalendarButton";
import CommunitySection from "./CommunitySection";
import LiveNewsSection from "./LiveNewsSection";
import HotPoliticianSection from "./HotPoliticianSection";
import TopNav from "@/components/common/TopNav/TopNav";

const CenterView = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserName(sessionStorage.getItem("nickname"));
  }, []);

  return (
    <div className={styles.page}>
      <TopNav />
      <div className={styles.page__contents} id="pageContents">
        <HotPoliticianSection userName={userName} />
        <div className={styles.page__contents__dataSection}>
          <LiveNewsSection />
          <div className={styles.page__contents__dataSection__etcContainer}>
            <CalendarButton />
            <CommunitySection />
          </div>
        </div>
        <div className={styles.page__contents__creditSection}>
          <div className={styles.page__contents__creditSection__contents}>
            <div className={styles.page__contents__creditSection__contents__item}>
              개인정보 처리방침
            </div>
            <div className={styles.page__contents__creditSection__contents__item}>이용약관</div>
            <div className={styles.page__contents__creditSection__contents__item}>
              ©RunningMate ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </div>
      <BotNav />
    </div>
  );
};

export default CenterView;
