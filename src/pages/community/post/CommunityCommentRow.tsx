import React from "react";
import styles from "./CommunityCommentRow.module.scss";
import { CommentType } from "@/types/post";
import Heart from "@assets/heart.svg?react";
import WordBaloon from "@assets/wordBaloon.svg?react";

interface Props {
  commentData: CommentType;
}

const CommunityCommentRow = ({ commentData }: Props) => {
  return (
    <div className={styles.communityCommentRow}>
      <div className={styles.communityCommentRow__head}>
        {commentData.writer}
        <div className={styles.communityCommentRow__head__reaction}>
          <div>
            <Heart />
            {commentData.likeCount}
          </div>
          <WordBaloon />
        </div>
      </div>
      <div className={styles.communityCommentRow__body}>{commentData.content}</div>
      <div className={styles.communityCommentRow__tail}>{commentData.createdAt}</div>
    </div>
  );
};

export default CommunityCommentRow;
