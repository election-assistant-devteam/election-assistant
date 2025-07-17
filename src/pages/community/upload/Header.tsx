import styles from "./Header.module.scss";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props {
  handleSubmit: () => void;
}

const Header = ({ handleSubmit }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.header__leftSection} onClick={() => navigate(-1)}>
        <MdKeyboardArrowLeft size="30" />
      </div>
      <div className={styles.header__compButton} onClick={handleSubmit}>
        완료
      </div>
    </div>
  );
};

export default Header;
