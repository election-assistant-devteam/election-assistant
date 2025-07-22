import React, { useEffect, useRef, useState } from "react";
import styles from "./FreeSectionView.module.scss";
import Button from "@/components/common/button/Button";
import { PostType } from "@/types/post";
import { apiCall } from "@/services/authServices";
import Loading from "@/components/common/loading/Loading";
import CommunityPostRow from "../common/CommunityPostRow";
import { useNavigate } from "react-router-dom";

const FreeSectionView = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false);
  const navigate = useNavigate();

  // 무한 스크롤을 위한 배치 데이터 인덱스
  const lastId = useRef<number | null>(null);
  // 무한 스크롤 트리거 관찰용 div 태그에 대한 참조 변수
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  // 무한 스크롤 트리거를 위한 리스트 참조 변수
  const contentsRef = useRef<HTMLDivElement>(null);

  const fetchPosts = async () => {
    // 1) 이미 요청 중이면 무시
    if (isFetching.current || !hasMore) return;

    // 2) 즉시 락 걸기
    isFetching.current = true;
    try {
      const params = new URLSearchParams();
      if (lastId.current != null) {
        params.append("lastId", lastId.current.toString());
      }
      const PATH = `/posts?${params.toString()}`;
      const response = await apiCall(PATH, "GET", null, true);

      if (response.code === 20000) {
        console.log(response);
        setPostList((prev) => [...prev, ...response.data.posts]);
        setHasMore(response.data.hasMore);
        lastId.current = response.data.lastId;
      } else {
        console.error("API error", response.code, response.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      isFetching.current = false;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Intersection Observer 설정 (loadMoreRef태그를 탐지하면서, 뷰포트에 해당 태그가 걸리면 함수호출)
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        await fetchPosts();
      },
      { root: null, rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.freeSectionView}>
      <div className={styles.freeSectionView__header}>
        <div>자유게시판</div>
        <Button
          text="글 작성"
          className={styles.button}
          onClick={() => navigate("/community/write")}
        />
      </div>
      <div className={styles.freeSectionView__postList} ref={contentsRef}>
        {postList?.map((item, _) => (
          <CommunityPostRow data={item} key={item.postId} />
        ))}
        {isFetching.current && <Loading />}
        {/* 무한 스크롤 트리거용 div 태그 */}
        <div ref={loadMoreRef} style={{ height: "10px", color: "white" }}></div>
      </div>
    </div>
  );
};

export default FreeSectionView;
