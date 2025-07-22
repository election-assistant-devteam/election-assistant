import styles from "./CommunityPostRow.module.scss";
import Heart from "@assets/heart.svg?react";
import WordBaloon from "@assets/wordBaloon.svg?react";
import { PostType } from "@/types/post";
import { useNavigate } from "react-router-dom";

interface Props {
  data: PostType;
}

const CommunityPostRow = ({ data }: Props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/community/post/${data.postId}`);
  };
  return (
    <div className={styles.communityPostRow} onClick={clickHandler}>
      <div className={styles.communityPostRow__title}>{data.title}</div>
      <div className={styles.communityPostRow__content}>{data.content}</div>
      <div className={styles.communityPostRow__reactSection}>
        <div className={styles.communityPostRow__reactSection__area}>
          <Heart />
          {data.likeCount}
        </div>
        <div className={styles.communityPostRow__reactSection__area}>
          <WordBaloon />
          {data.commentCount}
        </div>
      </div>
    </div>
  );
};

export default CommunityPostRow;
