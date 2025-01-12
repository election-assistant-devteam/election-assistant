import React from "react";
import styles from "./NavBar.module.scss";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

interface Props {
  text: string;
}

function NavBar({ text }: Props) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navBar__goBackButton} onClick={goBack}>
        <SlArrowLeft />
      </div>
      <div className={styles.navBar__innerText}>{text}</div>
    </div>
  );
}

export default NavBar;
