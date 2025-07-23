import styles from "./TosPage.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import TosView from "./TosView";

const TosPage = () => {
  return (
    <div className={styles.privacyPage}>
      <NavBar text={"개인정보 처리방침"} />
      <TosView />
    </div>
  );
};

export default TosPage;
