import { useEffect, useState } from "react";
import styles from "./HotSectionView.module.scss";
import { PostType } from "@/types/post";
import { apiCall } from "@/services/authServices";
import CommunityPostRow from "../common/CommunityPostRow";
import Loading from "@/components/common/loading/Loading";

const HotSectionView = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const PATH = `/posts/popular-posts`;

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await apiCall(PATH, "GET");

      switch (response.code) {
        case 20000:
          setPostList(response.data.popularPosts);
          break;
        default:
          alert(response.message);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.hotSectionView}>
      <div className={styles.hotSectionView__header}>인기글</div>
      <div className={styles.hotSectionView__list}>
        {postList.map((item, _) =>
          loading ? <Loading /> : <CommunityPostRow data={item} key={item.postId} />
        )}
      </div>
    </div>
  );
};

export default HotSectionView;
