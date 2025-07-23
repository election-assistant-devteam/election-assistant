import styles from "./CommunitySection.module.scss";
import { FaHotjar } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import CommunityHotPost from "./CommunityHotPost";
import { useNavigate } from "react-router-dom";
import { HotPost } from "@/types/centerview";

interface Props {
  hotPosts: HotPost[];
}

const CommunitySection = ({ hotPosts }: Props) => {
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
        {hotPosts?.map((item, index) => (
          <CommunityHotPost title={item.title} key={index}></CommunityHotPost>
        ))}
      </div>

      <div className={styles.community__foot} onClick={() => navigate("/community")}>
        <div className={styles.community__foot__button__text}>커뮤니티 바로가기</div>
        <div className={styles.community__foot__button__icon}>
          <MdArrowForwardIos />
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
