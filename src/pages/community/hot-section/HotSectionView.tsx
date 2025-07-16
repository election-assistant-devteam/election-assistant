import { useEffect, useState } from "react";
import styles from "./HotSectionView.module.scss";
import { PostType } from "@/types/post";
import { apiCall } from "@/services/authServices";
import CommunityPostRow from "../common/CommunityPostRow";
import Loading from "@/components/common/loading/Loading";

const HotSectionView = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const PATH = `/posts/popular-posts`;
      const response = await apiCall(PATH, "GET");

      if (response.code === 20000) {
        console.log(response);
        setPostList(response.data.popularPosts);
      } else {
        console.error("API error", response.code, response.message);
      }
    } catch (err) {
      console.error(err);
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
