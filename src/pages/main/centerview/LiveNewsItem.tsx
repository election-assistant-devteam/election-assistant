import React from "react";
import styles from "./LiveNewsItem.module.scss";
import { NewsItemType } from "./LiveNewsSection";

type Props = {
  newsData: NewsItemType;
  additional?: boolean;
};

const LiveNewsItem = ({ newsData, additional }: Props) => {
  return (
    <div className={`${styles.content} ${additional && styles.additionalNews}`} onClick={() => window.open(newsData.link)}>
      <img src={newsData?.image?.replace("./", "/")} alt="" className={styles.content__image} />
      <div className={styles.content__newsTitle}>{newsData?.title}</div>
    </div>
  );
};

export default LiveNewsItem;
