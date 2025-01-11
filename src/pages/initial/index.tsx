import React from "react";
import styles from "./styles/initial.module.scss";
import Button from "@/components/common/button/Button";
import Title from "@/components/common/title/Title";
import { Link } from "react-router-dom";

function index() {
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__logoBox}></div>
        <div className={styles.page__contents__titleBox}>
          <Title></Title>
        </div>
        <div className={styles.page__contents__buttonBox}>
          <Link to={"/login"}>
            <Button text={"시작하기"} data={null}></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
