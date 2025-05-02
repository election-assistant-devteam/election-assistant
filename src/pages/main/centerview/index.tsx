import React, { useEffect, useState } from "react";
import styles from "./styles/centerview.module.scss";
import { FaSearch } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { LuCalendar } from "react-icons/lu";
import { FaHotjar } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import BotNav from "@/components/common/botnav/BotNav";
import { useNavigate } from "react-router-dom";
import AutoCarousel from "@/components/common/AutoCarousel/AutoCarousel";
import CalendarButton from "./CalendarButton";
import CommunitySection from "./CommunitySection";
import LiveNewsSection from "./LiveNewsSection";

const CenterView = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setUserName(sessionStorage.getItem("nickname"));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__searchSection}>
          <div className={styles.page__contents__searchSection__searchBar}>
            <input
              type="text"
              placeholder="찾고싶은 정치인을 입력하세요."
              className={styles.page__contents__searchSection__searchBar__inputText}
            />
            <FaSearch />
          </div>
          <div className={styles.page__contents__searchSection__interest}>
            <div className={styles.page__contents__searchSection__interest__textArea}>
              <div className={styles.page__contents__searchSection__interest__textArea__text}>
                {userName}님이 <br />
                관심있을만한
                <br />
                정치인이에요
              </div>
              <div
                className={styles.page__contents__searchSection__interest__textArea__edit}
                onClick={() => navigate("/edit")}
              >
                <div
                  className={styles.page__contents__searchSection__interest__textArea__edit__text}
                >
                  나의 관심 수정하기
                </div>
                <div
                  className={styles.page__contents__searchSection__interest__textArea__edit__icon}
                >
                  <MdArrowForwardIos />
                </div>
              </div>
            </div>
            <div className={styles.page__contents__searchSection__interest__imageArea}>
              <AutoCarousel></AutoCarousel>
            </div>
          </div>
        </div>
        <div className={styles.page__contents__dataSection}>
          <LiveNewsSection />
          <div className={styles.page__contents__dataSection__etcContainer}>
            <CalendarButton />
            <CommunitySection />
          </div>
        </div>
      </div>
      <BotNav></BotNav>
    </div>
  );
};

export default CenterView;
