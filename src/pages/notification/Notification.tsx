import React, { useEffect, useState } from "react";
import styles from "./styles/notification.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const getNotification = async () => {
  //     const response = await fetch("http://13.124.154.53:80/api/notification", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const result = await response.json();

  //     if (result.code === 20000) {
  //       setData(result.data.notifications);
  //     } else {
  //       alert(result.code);
  //     }
  //   };
  //   getNotification();
  // }, []);
  return (
    <div className={styles.page}>
      {/* <NavBar text="공지사항"></NavBar> */}
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
                {/* <div className={styles.page__contents__notifyList__notifyItem__foot__writer}>
                  {item.writer}
                </div> */}
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

export default Notification;
