import React, { useState } from "react";
import styles from "./InputBox.module.scss";

interface Props {
  placeHolder: string;
  handleData: (eventValue: string) => void;
}

function InputBox({ placeHolder, handleData }: Props) {
  const [data, setData] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleData(data); //id 혹은 pw를 셋팅해줌
    }
  };

  const handleBlur = () => {
    handleData(data);
  };

  return <input type="text" value={data} onChange={(e) => setData(e.target.value)} className={styles.inputBox} placeholder={placeHolder} onKeyDown={handleKeyDown} onBlur={handleBlur}></input>;
}

export default InputBox;
