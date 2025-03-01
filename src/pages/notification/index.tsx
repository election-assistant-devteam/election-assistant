import React, { useEffect, useState } from "react";
import styles from "./styles/notification.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // const mockNotify = [
  //   {
  //     id: 1,
  //     title: "첫 공지사항",
  //     writer: "운영자",
  //     time: new Date()
  //       .toLocaleDateString("ko-KR", {
  //         year: "numeric",
  //         month: "2-digit",
  //         day: "2-digit",
  //       })
  //       .replace(/\. /g, "/")
  //       .replace(/\.$/, ""),
  //   },
  //   {
  //     id: 2,
  //     title: "두번째 공지사항",
  //     writer: "운영자",
  //     time: new Date()
  //       .toLocaleDateString("ko-KR", {
  //         year: "numeric",
  //         month: "2-digit",
  //         day: "2-digit",
  //       })
  //       .replace(/\. /g, "/")
  //       .replace(/\.$/, ""),
  //   },
  // ];

  useEffect(() => {
    const getNotification = async () => {
      const response = await fetch("http://localhost:9001/notification", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.code === 20000) {
        console.log(result);
        setData(result.data.notificationList);
      }
    };
    getNotification();
  }, []);
  return (
    <div className={styles.page}>
      <NavBar text="공지사항"></NavBar>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__notifyList}>
          {data.map((item, index) => (
            <div
              className={styles.page__contents__notifyList__notifyItem}
              key={index}
              onClick={() => navigate(`/notification/post/${item.id}`)}
            >
              <div className={styles.page__contents__notifyList__notifyItem__head}>
                {item.title}
              </div>
              <div className={styles.page__contents__notifyList__notifyItem__foot}>
                <div className={styles.page__contents__notifyList__notifyItem__foot__writer}>
                  {item.writer}
                </div>
                <div className={styles.page__contents__notifyList__notifyItem__foot__time}>
                  {item.updatedAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default index;
