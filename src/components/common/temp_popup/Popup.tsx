import React, { useEffect, useState } from "react";
import styles from "./Popup.module.scss";

interface Props {
  text: string;
  className?;
}

function Popup({ className, text }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log(text);
    if (text) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [text]);

  return (
    <div className={`${styles.toastBox} ${className} ${isVisible ? styles.show : styles.hide}`}>
      {text}
    </div>
  );
}

export default Popup;
