import React from "react";
import styles from "./styles/initial.module.scss";
import Button from "@/components/common/button/Button";
import Title from "@/components/common/title/Title";

function index() {
  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__logoBox}></div>
        <div className={styles.page__contents__titleBox}>
          <Title></Title>
        </div>
      </div>
      <Button></Button>
    </div>
  );
}

export default index;
