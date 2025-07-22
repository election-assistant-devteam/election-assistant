import { apiCall } from "@/services/authServices";
import styles from "./PostReactionRow.module.scss";
import Heart from "@assets/heart.svg?react";
import WordBaloon from "@assets/wordBaloon.svg?react";
import { useEffect, useState } from "react";

interface Props {
  heartNum: number;
  postId: number;
  hasLiked: boolean;
  setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostReactionRow = ({ heartNum, postId, hasLiked, setDisplayInput }: Props) => {
  const [like, setLike] = useState<boolean>();

  const PATH = `/posts/${postId}/likes`;
  const clickHeartHandler = async () => {
    const response = await apiCall(PATH, "POST", null, true);

    switch (response.code) {
      case 20000:
        setLike((prev) => !prev);
        break;
      default:
        alert(response.message);
    }
  };

  useEffect(() => {
    if (hasLiked) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [hasLiked]);

  return (
    <div className={styles.postReactionRow}>
      <div className={styles.postReactionRow__like}>
        <Heart
          className={like ? `${styles.icon} ${styles.active}` : styles.icon}
          onClick={clickHeartHandler}
        />
        <div className={styles.postReactionRow__like__data}>공감 {heartNum}</div>
      </div>
      <div
        className={styles.postReactionRow__comment}
        onClick={() => setDisplayInput((prev) => !prev)}
      >
        <WordBaloon className={styles.icon} />
        댓글달기
      </div>
    </div>
  );
};

export default PostReactionRow;
