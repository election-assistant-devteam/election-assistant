import styles from "./CommunityPage.module.scss";
import HotSectionView from "./hot-section/HotSectionView";
import FreeSectionView from "./free-section/FreeSectionView";
import NavBar from "@/components/common/navigation/NavBar";

const CommunityPage = () => {
  return (
    <div className={styles.communityPage}>
      <NavBar text="커뮤니티" />
      <div className={styles.communityPage__contents}>
        <HotSectionView />
        <FreeSectionView />
      </div>
    </div>
  );
};

export default CommunityPage;
