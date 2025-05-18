import React from "react";
import styles from "./HotPoliticianSection.module.scss";
import { useNavigate } from "react-router-dom";
import AutoCarousel from "@/components/common/AutoCarousel/AutoCarousel";
import { MdArrowForwardIos } from "react-icons/md";
import SearchBar from "@/components/common/SearchBar/SearchBar";

type Props = {
  userName: string;
};

const HotPoliticianSection = ({ userName }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.searchSection}>
      <div className={styles.searchSection__header}>
        <img
          src="/icons/RunningMateLogo.svg"
          alt="러닝메이트 로고"
          className={styles.searchSection__header__logo}
        />
      </div>
      <SearchBar placeholder="찾고싶은 정치인을 입력하세요" />
      <div className={styles.searchSection__interest}>
        <div className={styles.searchSection__interest__textArea}>
          <div className={styles.searchSection__interest__textArea__text}>
            {userName}님이 <br />
            관심있을만한
            <br />
            정치인이에요
          </div>
          <div
            className={styles.searchSection__interest__textArea__edit}
            onClick={() => navigate("/edit")}
          >
            <div className={styles.searchSection__interest__textArea__edit__text}>
              나의 관심 수정하기
            </div>
            <div className={styles.searchSection__interest__textArea__edit__icon}>
              <MdArrowForwardIos />
            </div>
          </div>
        </div>
        <div className={styles.searchSection__interest__imageArea}>
          <AutoCarousel></AutoCarousel>
        </div>
      </div>
    </div>
  );
};

export default HotPoliticianSection;
