import React, { useState } from "react";
import styles from "./styles/specview.module.scss";

type Info = {
  name: string;
  age: number;
  birth: string;
  Residence: string;
  family: string;
  approvalRating: object;
  education: string[];
  career: string[];
  criminalRecord: string[];
  details: string[];
};

interface Props {
  viewNum: number;
  data: Info;
}

function index({ viewNum, data }: Props) {
  const [content, setContent] = useState([]);
  //   console.log(viewNum);
  //   console.log(data);

  switch (viewNum) {
    case 0:
      return (
        <div className={styles.contents}>
          {data.education.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      );
    case 1:
      return (
        <div className={styles.contents}>
          {data.career.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className={styles.contents}>
          {data.criminalRecord.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      );
    case 3:
      return <p>내용 D</p>;
    default:
      return <p>기본 내용</p>;
  }

  return content;
}

export default index;
