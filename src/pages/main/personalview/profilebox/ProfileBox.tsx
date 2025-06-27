import { useEffect, useState } from "react";
import styles from "./ProfileBox.module.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { curMainNum } from "@/recoil/atoms/curMainNum";

const ProfileBox = () => {
  const navigate = useNavigate();
  const [intPol, setIntPol] = useState<string>(""); // 선호 정치인
  const [intPar, setIntPar] = useState<string>(""); // 선호 정당
  const [curView, setCurView] = useRecoilState(curMainNum);

  const logout = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("refresh-token");
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("politicianOfInterest");
    sessionStorage.removeItem("partyOfInterest");
    setCurView(1);
    navigate("/");
  };

  useEffect(() => {
    setIntPol(sessionStorage.getItem("politicianOfInterest"));
    setIntPar(sessionStorage.getItem("partyOfInterest"));
  }, []);

  return (
    <div className={styles.profileSection}>
      <div className={styles.profileSection__name}>{sessionStorage.getItem("nickname")}님</div>
      <div className={styles.profileSection__dataBox}>
        <div className={styles.profileSection__dataBox__prefer}>
          <div className={styles.profileSection__dataBox__prefer__party}>
            <div className={styles.profileSection__dataBox__prefer__party__label}>선호 정당</div>
            <div className={styles.profileSection__dataBox__prefer__party__data}>
              {intPar === "null" ? "미등록" : intPar}
            </div>
          </div>
          <div className={styles.profileSection__dataBox__prefer__politician}>
            <div className={styles.profileSection__dataBox__prefer__politician__label}>
              선호 정치인
            </div>
            <div className={styles.profileSection__dataBox__prefer__politician__data}>
              {intPol === "null" ? "미등록" : intPol}
            </div>
          </div>
        </div>
        <div className={styles.profileSection__dataBox__info}>
          <div
            className={styles.profileSection__dataBox__info__edit}
            onClick={() => navigate("/edit")}
          >
            <div>내 정보 수정</div>
            <div>
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className={styles.profileSection__dataBox__info__logout} onClick={logout}>
            로그아웃
          </div>
        </div>
      </div>
      <div className={styles.profileSection__status}>
        <div className={styles.profileSection__status__post}>
          <div className={styles.profileSection__status__post__totalCount}>내가쓴글 8개</div>
          <div className={styles.viewAll}>
            <div>전체보기</div>
            <MdKeyboardArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
