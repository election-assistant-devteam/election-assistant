import Loading from "@/components/common/loading/Loading";
import styles from "./BriefInfoContainer.module.scss";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useEffect, useState } from "react";
import BriefInfoItem from "./BriefInfoItem";
import { apiCall } from "@/services/authServices";

interface Props {
  data: any;
}

const BriefInfoContainer = ({ data }: Props) => {
  const [observe, setObserve] = useState<boolean>(false);
  const [isThrottled, setIsThrottled] = useState(false); //서버부하줄이기 위한 쓰로틀링기능

  const dataArray = [
    {
      label: "이름",
      value: data?.politicianName,
    },
    {
      label: "나이",
      value: data?.age,
    },
    {
      label: "거주지",
      value: data?.habitation,
    },
    {
      label: "소속정당",
      value: data?.party,
    },
    {
      label: "직업",
      value: data?.job,
    },
  ];

  useEffect(() => {
    if (!data?.politicianId) return;

    const isWatched = async () => {
      const PATH = `/politicians/watch/tf/${data?.politicianId}`;
      const response = await apiCall(PATH, "GET", false, true);

      if (response.code === 20000) {
        setObserve(response.data);
      } else {
        console.error(response);
      }
    };
    isWatched();
  }, [data]);

  const sendObserve = async () => {
    if (!sessionStorage.getItem("id")) {
      alert("로그인 후 지켜보기 가능합니다");
      return;
    }
    if (isThrottled) {
      alert("5초 후 다시 지켜보기 및 지켜보기 취소가 가능합니다");
      return;
    }
    const PATH = `/politicians/likes/${data?.politicianId}`;

    if (!observe) {
      const response = await apiCall(PATH, "POST", false, true);
      if (response.code === 20000) {
        setObserve(!observe);
      } else {
        alert("서버 에러... 나중에 다시 시도하세요");
      }
    } else {
      const response = await apiCall(PATH, "DELETE", false, true);
      if (response.code === 20000) {
        setObserve(!observe);
      } else {
        alert("서버 에러... 나중에 다시 시도하세요");
      }
    }

    setIsThrottled(true);

    setTimeout(() => {
      setIsThrottled(false); // 다시 요청 가능하도록 변경
    }, 5000);
  };

  return (
    <div className={styles.profileBox}>
      <div className={styles.profileBox__profile}>
        {dataArray.map((item, index) => (
          <BriefInfoItem label={item.label} data={item ? item.value : "로딩중"} key={index} />
        ))}
      </div>
      {!data?.imageUrl ? (
        <Loading />
      ) : (
        <div className={styles.profileBox__imageSection}>
          <img
            src={data.imageUrl}
            alt={`${data?.politicianName} 이미지`}
            className={styles.profileBox__imageSection__image}
          />
          <MdOutlineRemoveRedEye
            size="30"
            className={
              observe
                ? `${styles.profileBox__imageSection__icon} ${styles.observe}`
                : styles.profileBox__imageSection__icon
            }
            onClick={sendObserve}
          />
        </div>
      )}
    </div>
  );
};

export default BriefInfoContainer;
