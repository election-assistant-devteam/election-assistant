import NavBar from "@/components/common/navigation/NavBar";
import styles from "./styles/candidate.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { apiCall } from "@/services/authServices";

function index() {
  const params = useParams();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState(""); // 상태로 eventName 관리
  const [candidateList, setCandidateList] = useState([]); // 상태로 candidateList 관리
  const lastId = useRef(0); // 무한 스크롤을 위한 배치 데이터 인덱스
  // const ENDPOINT = `http://54.180.165.220/api/elections/${params.id}/candidates?lastId=${lastId.current}`;
  const ENDPOINT = `http://localhost:9001/elections/${params.id}/candidates?lastId=${lastId.current}`;

  useEffect(() => {
    const getCandidateList = async () => {
      const response = await apiCall(ENDPOINT, "GET");
      console.log(response.data);

      if (response.code === 20000) {
        setEventName(response.name); // 상태 업데이트
        setCandidateList(response.data.candidates); // 상태 업데이트
        if (response.hasMore) {
          lastId.current = response.lastId;
        }
      } else {
        console.error(response.code, response.message);
      }
    };
    getCandidateList();
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <NavBar text={`${eventName} 후보자 목록`}></NavBar>
        <div className={styles.page__contents__cardList}>
          {candidateList.map((event, index) => (
            <div
              className={styles.page__contents__cardList__card}
              key={index}
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
              <div className={styles.page__contents__cardList__card__image}>{event.imageUrl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default index;
