import Loading from "@/components/common/loading/Loading";
import styles from "./BriefInfoContainer.module.scss";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import BriefInfoItem from "./BriefInfoItem";

interface Props {
  data: any;
}

const BriefInfoContainer = ({ data }: Props) => {
  /*지켜보기 기능*/
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

  const sendObserve = async () => {
    if (isThrottled) {
      alert("5초 후 다시 지켜보기 및 지켜보기 취소가 가능합니다");
      return;
    }
    if (!observe) {
      const response = await fetch(
        `https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/observe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            observe: true,
          }),
        }
      );

      if (response.status === 200) {
        // const result = await response.json();

        // console.log(result);
        // data = result.data;
        setObserve(true);
      } else {
        alert("서버 에러... 나중에 다시 시도하세요");
      }

      setIsThrottled(true);
    } else if (observe) {
      const response = await fetch(
        `https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/observe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            observe: false,
          }),
        }
      );

      if (response.status === 200) {
        // const result = await response.json();

        setObserve(false);
      } else {
        alert("서버 에러... 나중에 다시 시도하세요");
      }

      setIsThrottled(true);
    }

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
                : `${styles.profileBox__imageSection__icon} ${styles.nonObserve}`
            }
            onClick={sendObserve}
          />
        </div>
      )}
    </div>
  );
};

export default BriefInfoContainer;
