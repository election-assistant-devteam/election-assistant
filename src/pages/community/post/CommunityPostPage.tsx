import NavBar from "@/components/common/navigation/NavBar";
import styles from "./CommunityPostPage.module.scss";
import { useLocation, useParams } from "react-router-dom";
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
      console.log("data successfully fetched");
      console.log(response.data);
      setDetailData(response.data);
    } else {
      console.log("error happened");
    }
  };

  useEffect(() => {
    getPostDetail();
  }, []);

  return (
    <div className={styles.postPage}>
      <NavBar text={"zz"} />
      <CommunityPostView data={detailData} />
    </div>
  );
};

export default CommunityPostPage;
