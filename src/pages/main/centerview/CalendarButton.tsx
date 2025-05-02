import React from "react";
import styles from "./CalendarButton.module.scss";
import { useNavigate } from "react-router-dom";
import { LuCalendar } from "react-icons/lu";

const CalendarButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.issueCalendar}
      onClick={() => {
        navigate("/calendar");
      }}
    >
      <div className={styles.issueCalendar__icon}>
        <LuCalendar size="50" />
      </div>
      <div className={styles.issueCalendar__text}>
        이슈
        <br />
        캘린더
        <br />
        확인하기
        <br />
      </div>
    </div>
  );
};

export default CalendarButton;
