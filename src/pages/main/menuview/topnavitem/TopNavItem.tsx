import React from "react";
import styles from "./topnavitem.module.scss";

interface TopNavItemProps {
  idx: number;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  setViewNum: React.Dispatch<React.SetStateAction<number>>;
}

const TopNavItem = React.memo(({ idx, icon, label, isActive, setViewNum }: TopNavItemProps) => {
  return (
    <div
      className={styles.topNavItem}
      onClick={() => setViewNum(idx)}
      style={{ backgroundColor: isActive ? "#e0e0e0" : "transparent" }}
    >
      <div className={styles.topNavItem__icon}>{icon}</div>
      <div className={styles.topNavItem__text}>{label}</div>
    </div>
  );
});

export default TopNavItem;
