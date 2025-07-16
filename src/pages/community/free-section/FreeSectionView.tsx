import React, { useEffect, useRef, useState } from "react";
import styles from "./FreeSectionView.module.scss";
import Button from "@/components/common/button/Button";
import { PostType } from "@/types/post";
import { apiCall } from "@/services/authServices";
import Loading from "@/components/common/loading/Loading";
import CommunityPostRow from "../common/CommunityPostRow";

const FreeSectionView = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 무한 스크롤을 위한 배치 데이터 인덱스
  const lastId = useRef(0);
  // 무한 스크롤 트리거 관찰용 div 태그에 대한 참조 변수
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const PATH = `/posts?keyword=&lastId=${lastId.current}`;
      const response = await apiCall(PATH, "GET");

      if (response.code === 20000) {
        // console.log(response);
        setPostList((prev) => [...prev, ...response.data.posts]);
        setHasMore(response.data.hasMore);
        lastId.current = response.data.lastId;
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
    <div className={styles.freeSectionView}>
      <div className={styles.freeSectionView__header}>
        <div>자유게시판</div>
        <Button text="글 작성" className={styles.button} />
      </div>
      <div className={styles.freeSectionView__postList}>
        {postList?.map((item, _) => (
          <CommunityPostRow data={item} key={item.postId} />
        ))}
      </div>
      {loading && <Loading />}
      {/* 무한 스크롤 트리거용 div 태그 */}
      <div ref={loadMoreRef} style={{ height: "10px", color: "red" }}></div>
    </div>
  );
};

export default FreeSectionView;
