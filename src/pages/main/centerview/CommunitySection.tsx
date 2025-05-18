import React from "react";
import styles from "./CommunitySection.module.scss";
import { FaHotjar } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import CommunityHotPost from "./CommunityHotPost";
import { useNavigate } from "react-router-dom";

const hotPostTitles = [
  {
    id: 0,
    title: "나라꼴 개판이네",
    link: "",
  },
  {
    id: 1,
    title: "그 분 깜빵가서 속 시원하면 개추 ㅋㅋㅋ",
    link: "",
  },
  {
    id: 2,
    title: "계엄은 선 넘었지...",
    link: "",
  },
];

const CommunitySection = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.community}>
      <div className={styles.community__head}>
        <div className={styles.community__head__title}>커뮤니티</div>
        <div className={styles.community__head__subtitle}>
          <div className={styles.community__head__subtitle__icon}>
            <FaHotjar color="red" />
          </div>
          <div className={styles.community__head__subtitle__text}>인기글</div>
        </div>
      </div>
      <div className={styles.community__body}>
        {hotPostTitles.map((item, index) => (
          <CommunityHotPost title={item.title} key={item.id}></CommunityHotPost>
        ))}
      </div>

      <div className={styles.community__foot} onClick={() => navigate("/community")}>
        <div className={styles.community__foot__text}>커뮤니티 바로가기</div>
        <div className={styles.community__foot__icon}>
          <MdArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
