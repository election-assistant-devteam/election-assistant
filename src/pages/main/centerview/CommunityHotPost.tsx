import React from "react";
import styles from "./CommunityHotPost.module.scss";

type Props = {
  title: string;
};

const CommunityHotPost = ({ title }: Props) => {
  return <div className={styles.title}>{title}</div>;
};

export default CommunityHotPost;
