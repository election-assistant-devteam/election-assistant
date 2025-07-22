import React, { useEffect, useState } from "react";
import styles from "./CommunityCommentRow.module.scss";
import { CommentType } from "@/types/post";
import Heart from "@assets/heart.svg?react";
import WordBaloon from "@assets/wordBaloon.svg?react";
import { apiCall } from "@/services/authServices";
import dayjs from "dayjs";

interface Props {
  commentData: CommentType;
  setClicked: React.Dispatch<React.SetStateAction<number>>;
}

const CommunityCommentRow = ({ commentData, setClicked }: Props) => {
  const [like, setLike] = useState<boolean>(false);
  const [isThrottled, setIsThrottled] = useState(false);
  const PATH = `/comments/${commentData.commentId}/likes`;

  useEffect(() => {
    setLike(commentData.hasLiked);
  }, [commentData]);
  const heartHandler = async () => {
    if (isThrottled) {
      alert("5초 후 다시 좋아요 및 좋아요 취소가 가능합니다");
      return;
    }
    const response = await apiCall(PATH, "POST", null, true);

    if (response.code === 20000) {
      setLike((prev) => !prev);
    } else if (response.code === 40000) {
      alert(`${response.message}`);
    } else {
      alert("오류가 발생했습니다... 잠시 후 다시 시도하세요!");
    }

    setIsThrottled(true);

    setTimeout(() => {
      setIsThrottled(false); // 다시 요청 가능하도록 변경
    }, 5000);
  };
  return (
    <div className={styles.communityCommentRow}>
      <div className={styles.communityCommentRow__head}>
        {commentData.writer}
        <div className={styles.communityCommentRow__head__reaction}>
          <div className={styles.reactionBox}>
            <Heart
              className={like ? `${styles.heartIcon} ${styles.active}` : styles.heartIcon}
              onClick={heartHandler}
            />

            <div className={styles.text}>{commentData.likeCount}</div>
          </div>
          <WordBaloon className={styles.icon} onClick={() => setClicked(commentData.commentId)} />
        </div>
      </div>
      <div className={styles.communityCommentRow__body}>{commentData.content}</div>
      <div className={styles.communityCommentRow__tail}>
        {dayjs(commentData?.createdAt).format("YYYY-MM-DD HH:mm")}
      </div>
    </div>
  );
};

export default CommunityCommentRow;
