import React, { useRef, useState } from "react";
import styles from "./InputRow.module.scss";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

const InputRow = () => {
  const [inputValue, setInputValue] = useState("");

  const addComment = async () => {};
  return (
    <div className={styles.inputRow}>
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
