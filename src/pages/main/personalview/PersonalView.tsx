import TopNav from "@/components/common/TopNav/TopNav";
import styles from "./styles/personalview.module.scss";
import BotNav from "@/components/common/botnav/BotNav";
import { MdKeyboardArrowRight } from "react-icons/md";
import ProfileBox from "./profilebox/ProfileBox";

function PersonalView() {
  return (
    <div className={styles.page}>
      <TopNav></TopNav>
      <div className={styles.page__contents}>
        <ProfileBox />
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

export default PersonalView;
