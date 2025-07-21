import React from "react";
import styles from "./UploadPreviewRow.module.scss";
import { GiCancel } from "react-icons/gi";

interface Props {
  files: File[];
  removeFile: (number) => void;
}

const UploadPreviewRow = ({ files, removeFile }: Props) => {
  if (files.length === 0) return null;
  return (
    <div className={styles.uploadPreviewRow}>
      {files.map((file, index) => (
        <div className={styles.uploadPreviewRow__imgCard} key={index}>
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className={styles.uploadPreviewRow__imgCard__img}
          ></img>
          <GiCancel
            onClick={() => removeFile(index)}
            className={styles.uploadPreviewRow__imgCard__cancel}
          />
        </div>
      ))}
    </div>
  );
};

export default UploadPreviewRow;
