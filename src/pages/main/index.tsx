import React from "react";
import styles from "./styles/main.module.scss";
import BotNav from "@/components/common/botnav/BotNav";
import { FaSearch } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { LuCalendar } from "react-icons/lu";
import { FaHotjar } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function index() {
  const data = "홍길동";
  const politicianName = "봉길창";
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={styles.page__searchSection}>
        <div className={styles.page__searchSection__searchBar}>
          <input type="text" placeholder="검색어를 입력하세요." className={styles.page__searchSection__searchBar__inputText} />
          <FaSearch />
        </div>
        <div className={styles.page__searchSection__interest}>
          <div className={styles.page__searchSection__interest__textArea}>
            <div className={styles.page__searchSection__interest__textArea__text}>
              {data}님이 <br />
              관심있을만한
              <br />
              정치인이에요
            </div>
            <div className={styles.page__searchSection__interest__textArea__edit}>
              <div className={styles.page__searchSection__interest__textArea__edit__text}>나의 관심 수정하기</div>
              <div className={styles.page__searchSection__interest__textArea__edit__icon}>
                <MdArrowForwardIos />
              </div>
            </div>
          </div>
          <div className={styles.page__searchSection__interest__imageArea}>
            <img src="/src/assets/images/sample.jpg" alt="선호정치인 사진" className={styles.page__searchSection__interest__imageArea__image}></img>
            <div className={styles.page__searchSection__interest__imageArea__nameTag}>{politicianName}</div>
          </div>
        </div>
      </div>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__newsSection}>
          <div className={styles.page__contents__newsSection__head}>
            <div className={styles.page__contents__newsSection__head__title}>맞춤 뉴스</div>
            <FiSettings />
          </div>
          <div className={styles.page__contents__newsSection__body}>
            <div className={styles.page__contents__newsSection__body__image}>이미지</div>
            <div className={styles.page__contents__newsSection__body__newsTitle}>뉴스제목</div>
          </div>
          <div className={styles.page__contents__newsSection__foot}>
            <div className={styles.page__contents__newsSection__foot__text}>더 많은 뉴스 보기</div>
            <div className={styles.page__contents__newsSection__foot__icon}>
              <MdArrowForwardIos />
            </div>
          </div>
        </div>
        <div className={styles.page__contents__etcSection}>
          <div className={styles.page__contents__etcSection__issueCalendar}>
            <div className={styles.page__contents__etcSection__issueCalendar__icon}>
              <LuCalendar size="50" />
            </div>
            <div
              className={styles.page__contents__etcSection__issueCalendar__text}
              onClick={() => {
                navigate("/calendar");
              }}
            >
              이슈
              <br />
              캘린더
              <br />
              확인하기
              <br />
            </div>
          </div>
          <div className={styles.page__contents__etcSection__community}>
            <div className={styles.page__contents__etcSection__community__head}>
              <div className={styles.page__contents__etcSection__community__head__title}>커뮤니티</div>
            </div>
            <div className={styles.page__contents__etcSection__community__hot}>
              <div className={styles.page__contents__etcSection__community__hot__title}>
                <div className={styles.page__contents__etcSection__community__hot__icon}>
                  <FaHotjar color="red" />
                </div>
                <div className={styles.page__contents__etcSection__community__hot__text}>인기글</div>
              </div>
              <div className={styles.page__contents__etcSection__community__post}>인기글 1</div>
              <div className={styles.page__contents__etcSection__community__post}>인기글 2</div>
              <div className={styles.page__contents__etcSection__community__post}>인기글 3</div>
            </div>

            <div className={styles.page__contents__etcSection__community__foot}>
              <div className={styles.page__contents__etcSection__community__foot__text}>커뮤니티 바로가기</div>
              <div className={styles.page__contents__etcSection__community__foot__icon}>
                <MdArrowForwardIos />
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
