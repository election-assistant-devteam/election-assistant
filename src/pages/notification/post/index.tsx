import React, { useEffect, useState } from "react";
import styles from "./styles/post.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import { useParams } from "react-router-dom";

function index() {
  const params = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const getNotificationData = async () => {
      const response = await fetch(`http://localhost:9001/notification/post?id=${params.id}`, {
        method: "GET",
      });

      const result = await response.json();

      if (result.code === 20000) {
        // console.log(result);
        // data = result.data;
        setData(result.data);
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
          <div className={styles.page__contents__head__time}>
            {data ? data.updatedAt : "로딩 중..."}
          </div>
        </div>
        <div className={styles.page__contents__body}>{data ? data.content : "로딩 중..."}</div>
      </div>
    </div>
  );
}

export default index;
