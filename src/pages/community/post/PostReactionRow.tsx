import styles from "./PostReactionRow.module.scss";
import Heart from "@assets/heart.svg?react";
import WordBaloon from "@assets/wordBaloon.svg?react";

interface Props {
  heartNum: number;
}

const PostReactionRow = ({ heartNum }: Props) => {
  return (
    <div className={styles.postReactionRow}>
      <div className={styles.postReactionRow__like}>
        <Heart className={styles.icon} />
        <div className={styles.postReactionRow__like__data}>공감 {heartNum}</div>
      </div>
      <div className={styles.postReactionRow__comment}>
        <WordBaloon className={styles.icon} />
        댓글달기
      </div>
    </div>
  );
};

export default PostReactionRow;
