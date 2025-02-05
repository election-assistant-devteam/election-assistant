import React from "react";
import styles from "./styles/faq.module.scss";
import NavBar from "@/components/common/navigation/NavBar";

function index() {
  return (
    <div className={styles.page}>
      <NavBar text="FAQ"></NavBar>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__faqContainer}>
          <div className={styles.page__contents__faqContainer__faqItem}>
            <div className={styles.page__contents__faqContainer__faqItem__head}>RunningMate는 어떤 서비스인가요?</div>
            <div className={styles.page__contents__faqContainer__faqItem__body}>
              최근 젊은 세대의 정치에 대한 접근성이 낮고, <br />
              이로인해 그들의 목소리가 정치에 잘 반영되지 못하고 있습니다. 이러한 상황에서 국내 정치 현황에 쉽게 접근하고,
              <br /> 현안에 대한 쉽게 의견을 수렴하고, 선거시 후보자들의 정보를 간편하게 확인하여 올바른 의사 결정 및 주권행사에 도움을 주기 위해 개발된 서비스입니다.
            </div>
          </div>
          <div className={styles.page__contents__faqContainer__faqItem}>
            <div className={styles.page__contents__faqContainer__faqItem__head}>RunningMate는 누가 만들었나요?</div>
            <div className={styles.page__contents__faqContainer__faqItem__body}>건국대학교 22학번 재학생으로 구성된 팀이 만든 서비스입니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
