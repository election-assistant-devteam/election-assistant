import React from "react";
import styles from "./LiveNewsItem.module.scss";
import { NewsItemType } from "./LiveNewsSection";

type Props = {
  newsData: NewsItemType;
};

const LiveNewsItem = ({ newsData }: Props) => {
  return (
    <div className={styles.body} onClick={() => window.open(newsData.link)}>
      <img src={newsData?.image?.replace("./", "/")} alt="" className={styles.body__image} />
      <div className={styles.body__newsTitle}>{newsData?.title}</div>
    </div>
  );
};

export default LiveNewsItem;
