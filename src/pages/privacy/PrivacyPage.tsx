import styles from "./PrivacyPage.module.scss";
import PrivacyView from "./PrivacyView";
import NavBar from "@/components/common/navigation/NavBar";

const PrivacyPage = () => (
  <div className={styles.privacyPage}>
    <NavBar text={"개인정보 처리방침"} />
    <PrivacyView />
  </div>
);

export default PrivacyPage;
