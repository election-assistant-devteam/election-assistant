import NavBar from "@/components/common/navigation/NavBar";
import styles from "./styles/candidate.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function index() {
  const params = useParams();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState(""); // 상태로 eventName 관리
  const [candidateList, setCandidateList] = useState([]); // 상태로 candidateList 관리
  const sample = 22;

  useEffect(() => {
    const getCandidateList = async () => {
      const response = await fetch(`https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/candidate/${params.id}`, {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        setEventName(data.name); // 상태 업데이트
        setCandidateList(data.candidates); // 상태 업데이트
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
            <div className={styles.page__contents__cardList__card} key={index} onClick={() => navigate(`/politician/${event.id}`)}>
              <div className={styles.page__contents__cardList__card__info}>
                <div className={styles.page__contents__cardList__card__info__party}>{event.party}</div>
                <div className={styles.page__contents__cardList__card__info__name}>{event.name}</div>
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
