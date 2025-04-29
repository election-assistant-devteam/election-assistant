//import React from "react";
import styles from "./styles/personalview.module.scss";
import BotNav from "@/components/common/botnav/BotNav";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    sessionStorage.removeItem("nickname");
    navigate("/");
  };
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__profileSection}>
          <div className={styles.page__contents__profileSection__name}>
            {sessionStorage.getItem("nickname")}님
          </div>
          <div className={styles.page__contents__profileSection__dataBox}>
            <div className={styles.page__contents__profileSection__dataBox__prefer}>
              <div className={styles.page__contents__profileSection__dataBox__prefer__party}>
                <div
                  className={styles.page__contents__profileSection__dataBox__prefer__party__label}
                >
                  선호 정당
                </div>
                <div
                  className={styles.page__contents__profileSection__dataBox__prefer__party__data}
                >
                  무슨무슨당
                </div>
              </div>
              <div className={styles.page__contents__profileSection__dataBox__prefer__politician}>
                <div
                  className={
                    styles.page__contents__profileSection__dataBox__prefer__politician__label
                  }
                >
                  선호 정치인
                </div>
                <div
                  className={
                    styles.page__contents__profileSection__dataBox__prefer__politician__data
                  }
                >
                  봉길창
                </div>
              </div>
            </div>
            <div className={styles.page__contents__profileSection__dataBox__info}>
              <div
                className={styles.page__contents__profileSection__dataBox__info__edit}
                onClick={() => navigate("/edit")}
              >
                <div>내 정보 수정</div>
                <div>
                  <MdKeyboardArrowRight />
                </div>
              </div>
              <div
                className={styles.page__contents__profileSection__dataBox__info__logout}
                onClick={logout}
              >
                로그아웃
              </div>
            </div>
          </div>
          <div className={styles.page__contents__profileSection__status}>
            <div className={styles.page__contents__profileSection__status__post}>
              <div className={styles.page__contents__profileSection__status__post__totalCount}>
                내가쓴글 8개
              </div>
              <div className={styles.viewAll}>
                <div>전체보기</div>
                <MdKeyboardArrowRight />
              </div>
            </div>
            {/* <div className={styles.page__contents__profileSection__status__donate}>
              <div className={styles.page__contents__profileSection__status__donate__totalCount}>후원중인 정치인 8명</div>
              <div className={styles.viewAll}>
                <div>전체보기</div>
                <MdKeyboardArrowRight />
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles.page__contents__recordSection}>
          <div className={styles.page__contents__recordSection__scrapContainer}>
            <div className={styles.page__contents__recordSection__scrapContainer__head}>
              <div className={styles.page__contents__recordSection__scrapContainer__head__title}>
                스크랩한 기사
              </div>
              <div className={styles.viewAll}>
                <div>전체보기</div>
                <MdKeyboardArrowRight />
              </div>
            </div>
            <div className={styles.page__contents__recordSection__scrapContainer__body}>
              <div className={styles.page__contents__recordSection__scrapContainer__body__text}>
                1
              </div>
              <div className={styles.page__contents__recordSection__scrapContainer__body__text}>
                2
              </div>
              <div className={styles.page__contents__recordSection__scrapContainer__body__text}>
                3
              </div>
            </div>
          </div>
          <div className={styles.page__contents__recordSection__watchContainer}>
            <div className={styles.page__contents__recordSection__watchContainer__head}>
              <div className={styles.page__contents__recordSection__watchContainer__head__title}>
                지켜보기중인 정치인
              </div>
              <div className={styles.viewAll}>
                <div>전체보기</div>
                <MdKeyboardArrowRight />
              </div>
            </div>
            <div className={styles.page__contents__recordSection__watchContainer__body}>
              <div className={styles.page__contents__recordSection__watchContainer__body__text}>
                1
              </div>
              <div className={styles.page__contents__recordSection__watchContainer__body__text}>
                2
              </div>
              <div className={styles.page__contents__recordSection__watchContainer__body__text}>
                3
              </div>
            </div>
          </div>
        </div>
      </div>
      <BotNav></BotNav>
    </div>
  );
}

export default index;
