import styles from "./CommunityPage.module.scss";
import TopNav from "@/components/common/TopNav/TopNav";
import HotSectionView from "./hot-section/HotSectionView";
import FreeSectionView from "./free-section/FreeSectionView";

const CommunityPage = () => {
  return (
    <div className={styles.communityPage}>
      <TopNav />
      <div className={styles.communityPage__contents}>
        <HotSectionView />
        <FreeSectionView />
      </div>
    </div>
  );
};

export default CommunityPage;
