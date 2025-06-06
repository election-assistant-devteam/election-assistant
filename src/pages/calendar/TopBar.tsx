import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import styles from "./topbar.module.scss";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.topBar}>
      <MdKeyboardArrowLeft
        color="#21005d"
        size="30"
        onClick={() => {
          navigate(-1);
        }}
        className={styles.topBar__prevArrow}
      />
    </div>
  );
};

export default TopBar;
