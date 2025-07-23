import React, { useEffect } from "react";
import styles from "./HotPoliticianSection.module.scss";
import { useNavigate } from "react-router-dom";
import AutoCarousel from "@/components/common/AutoCarousel/AutoCarousel";
import { MdArrowForwardIos } from "react-icons/md";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { HotPolitician } from "@/types/centerview";

type Props = {
  userName: string;
  hotPoliData: HotPolitician[];
};

const HotPoliticianSection = ({ userName, hotPoliData }: Props) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(false);
  const accessToken = sessionStorage.getItem("access-token");

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken]);

  // useEffect(() => {
  //   console.log(hotPoliData);
  // }, [hotPoliData]);

  return (
    <div className={styles.searchSection}>
      <div className={styles.searchSection__header}>
        <div className={styles.searchSection__header__left}>
          <img
            src="/icons/agora_title2.png"
            alt="러닝메이트 로고"
            className={styles.searchSection__header__left__logo}
          />
        </div>

        <div className={styles.searchSection__header__searchBar}>
          <SearchBar placeholder="찾고싶은 정치인을 입력하세요" />
        </div>
        <div className={styles.searchSection__header__rightArea}></div>
      </div>

      <div className={styles.searchSection__interest}>
        {isLogin ? (
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
        ) : (
          <div className={styles.searchSection__interest__textArea}>
            <div className={styles.searchSection__interest__textArea__text}>
              로그인시 더 많은 서비스를 이용하실 수 있습니다
            </div>
            <div
              className={styles.searchSection__interest__textArea__edit}
              onClick={() => navigate("/login")}
            >
              <div className={styles.searchSection__interest__textArea__edit__text}>로그인하기</div>
              <div className={styles.searchSection__interest__textArea__edit__icon}>
                <MdArrowForwardIos />
              </div>
            </div>
          </div>
        )}

        <div className={styles.searchSection__interest__imageArea}>
          <AutoCarousel data={hotPoliData} />
        </div>
      </div>
    </div>
  );
};

export default HotPoliticianSection;
