import React, { useRef, useState } from "react";
import styles from "./InputRow.module.scss";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import CheckCircle from "@assets/checkCircle.svg?react";
import { apiCall } from "@/services/authServices";

interface Props {
  postId: number;
  clickedCommentId: number;
  onCommentSubmit: () => void;
  displayInput: boolean;
}

interface CommentReqData {
  writerId: number;
  isAnonymous: boolean;
  content: string;
  parentId: number | null;
}

const InputRow = ({ postId, clickedCommentId, onCommentSubmit, displayInput }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const PATH = `/posts/${postId}/comments`;

  const addComment = async () => {
    const data: CommentReqData = {
      writerId: Number(sessionStorage.getItem("id")),
      isAnonymous: anonymous,
      content: inputValue,
      parentId: clickedCommentId,
    };
    const response = await apiCall(PATH, "POST", data, true);

    if (response.code === 20000) {
      alert("댓글이 성공적으로 작성되었습니다");
      setInputValue("");
      onCommentSubmit();
    } else {
      alert("에러");
    }
  };
  return (
    <div className={displayInput ? styles.inputRow : styles.invisible}>
      <div
        className={
          anonymous ? `${styles.inputRow__anonymous} ${styles.active}` : styles.inputRow__anonymous
        }
        onClick={() => setAnonymous((prev) => !prev)}
      >
        <CheckCircle />
        익명
      </div>

      <input
        type="text"
        placeholder="댓글을 입력하세요."
        className={styles.inputRow__inputTag}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <PiPaperPlaneTiltBold
        className={styles.inputRow__sendButton}
        size="20"
        onClick={addComment}
      />
    </div>
  );
};

export default InputRow;
