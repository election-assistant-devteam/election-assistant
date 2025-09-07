//import React from "react";
import styles from "./NavBar.module.scss";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface Props {
  text: string;
  className?;
}

function NavBar({ text, className }: Props) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={`${styles.navBar} ${className}`}>
      <MdKeyboardArrowLeft size="25" className={styles.navBar__goBackButton} onClick={goBack} />
      <div className={styles.navBar__innerText}>{text}</div>
    </div>
  );
}

export default NavBar;
