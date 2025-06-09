import NavBar from "@/components/common/navigation/NavBar";
import styles from "./styles/candidate.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiCall } from "@/services/authServices";
import Loading from "@/components/common/loading/Loading";

function CandidateView() {
  // 이전 화면으로부터 이벤트 이름 가져오기
  const location = useLocation();
  const eventName = location.state;

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const lastId = useRef(0); // 무한 스크롤을 위한 배치 데이터 인덱스

  // 무한 스크롤 트리거 관찰용 div 태그에 대한 참조 변수
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  // 무한 스크롤 트리거를 위한 리스트 참조 변수
  const contentsRef = useRef<HTMLDivElement>(null);

  const [candidateList, setCandidateList] = useState([]); // 상태로 candidateList 관리

  // api endpoint
  const ENDPOINT = `http://54.180.165.220/api/elections/${id}/candidates?lastId=${lastId.current}`;
  // const ENDPOINT = `http://localhost:9001/elections/${id}/candidates?lastId=${lastId.current}`;

  // 데이터 페칭 함수
  const fetchCandidates = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      // const url = `http://localhost:9001/elections/${id}/candidates?lastId=${lastId.current}`;
      const url = `http://54.180.165.220/api/elections/${id}/candidates?lastId=${lastId.current}`;
      const response = await apiCall(url, "GET");

      if (response.code === 20000) {
        // console.log(response);
        setCandidateList((prev) => [...prev, ...response.data.candidates]);
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

  // 첫 번째 페이지 로드
  useEffect(() => {
    fetchCandidates();
  }, []);

  // Intersection Observer 설정 (loadMoreRef태그를 탐지하면서, 뷰포트에 해당 태그가 걸리면 함수호출)
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        // console.log("intersecting:", entry.isIntersecting);
        if (!entry.isIntersecting) return;
        await fetchCandidates();
      },
      { root: contentsRef.current, rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(loadMoreRef.current);
  }, [fetchCandidates]);

  return (
    <div className={styles.page}>
      <div className={styles.page__contents} ref={contentsRef}>
        <NavBar text={`${eventName} 후보자 목록`}></NavBar>
        <div className={styles.page__contents__cardList}>
          {candidateList.map((event, index) => (
            <div
              key={index}
              className={styles.page__contents__cardList__card}
              onClick={() => navigate(`/politician/${event.id}`)}
            >
              <div className={styles.page__contents__cardList__card__info}>
                <div className={styles.page__contents__cardList__card__info__party}>
                  {event.party}
                </div>
                <div className={styles.page__contents__cardList__card__info__name}>
                  {event.name}
                </div>
              </div>
              <div className={styles.page__contents__cardList__card__imageSection}>
                <img
                  src={event.imageUrl}
                  alt={`${event.name} 사진`}
                  className={styles.page__contents__cardList__card__imageSection__img}
                />
              </div>
            </div>
          ))}
        </div>
        {loading && <Loading />}
        {/* 무한 스크롤 트리거용 div 태그 */}
        <div ref={loadMoreRef} style={{ height: "10px", color: "red" }}></div>
      </div>
    </div>
  );
}

export default CandidateView;
