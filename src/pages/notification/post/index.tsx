import React, { useEffect, useState } from "react";
import styles from "./styles/post.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import { useParams } from "react-router-dom";

function index() {
  const params = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const getNotificationData = async () => {
      const response = await fetch(
        `https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/notification/post/${params.id}`,
        {
          method: "GET",
        }
      );

      if (response.status === 200) {
        const result = await response.json();

        // console.log(result);
        // data = result.data;
        setData(result);
      }
    };
    getNotificationData();
  }, []);
  return (
    <div className={styles.page}>
      <NavBar text={""}></NavBar>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__head}>
          <div className={styles.page__contents__head__title}>
            {data ? data.title : "로딩 중..."}
          </div>
          <div className={styles.page__contents__head__time}>{data ? data.time : "로딩 중..."}</div>
        </div>
        <div className={styles.page__contents__body}>{data ? data.content : "로딩 중..."}</div>
      </div>
    </div>
  );
}

export default index;
