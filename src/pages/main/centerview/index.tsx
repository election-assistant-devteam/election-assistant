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

// interface Props {
//   view: number;
//   handleView: (viewNum: number) => void;
// }

function index() {
  const data = "홍길동";
  const politicianName = "봉길창";
  const [newsData, setNewsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/news_data.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setNewsData(data);
      })
      .catch((error) => console.error("Error loading news_data", error));
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
                {data}님이 <br />
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
              {/* <img
                src="/src/assets/images/sample.jpg"
                alt="선호정치인 사진"
                className={styles.page__contents__searchSection__interest__imageArea__image}
              ></img>
              <div className={styles.page__contents__searchSection__interest__imageArea__nameTag}>
                {politicianName}
              </div> */}
              <AutoCarousel></AutoCarousel>
            </div>
          </div>
        </div>
        <div className={styles.page__contents__dataSection}>
          <div className={styles.page__contents__dataSection__newsContainer}>
            <div className={styles.page__contents__dataSection__newsContainer__head}>
              <div className={styles.page__contents__dataSection__newsContainer__head__title}>
                맞춤 뉴스
              </div>
              {/* <FiSettings /> */}
            </div>
            <div
              className={styles.page__contents__dataSection__newsContainer__body}
              onClick={() => window.open(newsData[0].link)}
            >
              <img
                src={newsData?.[0]?.image?.replace("./", "/")}
                alt=""
                className={styles.page__contents__dataSection__newsContainer__body__image}
              />
              <div className={styles.page__contents__dataSection__newsContainer__body__newsTitle}>
                {newsData?.[0]?.title}
              </div>
            </div>
            <div
              className={`${styles.page__contents__dataSection__newsContainer__body} ${styles.additionalNews}`}
              onClick={() => window.open(newsData[1].link)}
            >
              <img
                src={newsData?.[1]?.image?.replace("./", "/")}
                alt=""
                className={styles.page__contents__dataSection__newsContainer__body__image}
              />
              <div className={styles.page__contents__dataSection__newsContainer__body__newsTitle}>
                {newsData?.[1]?.title}
              </div>
            </div>
            <div className={styles.page__contents__dataSection__newsContainer__foot}>
              <div
                className={styles.page__contents__dataSection__newsContainer__foot__text}
                onClick={() => navigate("/news", { state: newsData })}
              >
                더 많은 뉴스 보기
              </div>
              <div className={styles.page__contents__dataSection__newsContainer__foot__icon}>
                <MdArrowForwardIos />
              </div>
            </div>
          </div>
          <div className={styles.page__contents__dataSection__etcContainer}>
            <div
              className={styles.page__contents__dataSection__etcContainer__issueCalendar}
              onClick={() => {
                navigate("/calendar");
              }}
            >
              <div
                className={styles.page__contents__dataSection__etcContainer__issueCalendar__icon}
              >
                <LuCalendar size="50" />
              </div>
              <div
                className={styles.page__contents__dataSection__etcContainer__issueCalendar__text}
              >
                이슈
                <br />
                캘린더
                <br />
                확인하기
                <br />
              </div>
            </div>
            <div className={styles.page__contents__dataSection__etcContainer__community}>
              <div className={styles.page__contents__dataSection__etcContainer__community__head}>
                <div
                  className={
                    styles.page__contents__dataSection__etcContainer__community__head__title
                  }
                >
                  커뮤니티
                </div>
              </div>
              <div className={styles.page__contents__dataSection__etcContainer__community__hot}>
                <div
                  className={
                    styles.page__contents__dataSection__etcContainer__community__hot__title
                  }
                >
                  <div
                    className={
                      styles.page__contents__dataSection__etcContainer__community__hot__icon
                    }
                  >
                    <FaHotjar color="red" />
                  </div>
                  <div
                    className={
                      styles.page__contents__dataSection__etcContainer__community__hot__text
                    }
                  >
                    인기글
                  </div>
                </div>
                <div className={styles.page__contents__dataSection__etcContainer__community__post}>
                  인기글 1
                </div>
                <div className={styles.page__contents__dataSection__etcContainer__community__post}>
                  인기글 2
                </div>
                <div className={styles.page__contents__dataSection__etcContainer__community__post}>
                  인기글 3
                </div>
              </div>

              <div
                className={styles.page__contents__dataSection__etcContainer__community__foot}
                onClick={() => navigate("/community")}
              >
                <div
                  className={
                    styles.page__contents__dataSection__etcContainer__community__foot__text
                  }
                >
                  커뮤니티 바로가기
                </div>
                <div
                  className={
                    styles.page__contents__dataSection__etcContainer__community__foot__icon
                  }
                >
                  <MdArrowForwardIos />
                </div>
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
