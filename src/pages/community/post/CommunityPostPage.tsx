import NavBar from "@/components/common/navigation/NavBar";
import styles from "./CommunityPostPage.module.scss";
import { useParams } from "react-router-dom";
import CommunityPostView from "./CommunityPostView";
import { useEffect, useState } from "react";
import { apiCall } from "@/services/authServices";
import { DetailPostType } from "@/types/post";

const CommunityPostPage = () => {
  const { postId } = useParams();
  const [detailData, setDetailData] = useState<DetailPostType>();

  const getPostDetail = async () => {
    const PATH = `/posts/${postId}`;
    const response = await apiCall(PATH, "GET", undefined, true);

    if (response.code === 20000) {
      setDetailData(response.data);
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    getPostDetail();
  }, []);

  return (
    <div className={styles.postPage}>
      <NavBar text={detailData?.title} />
      <CommunityPostView data={detailData} />
    </div>
  );
};

export default CommunityPostPage;
