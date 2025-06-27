import Button from "@/components/common/button/Button";
import InputBox from "@/components/common/input/InputBox";
import { useState } from "react";
import styles from "./ProfileEditBox.module.scss";

interface Props {
  setPw: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  pwValidation: boolean;
  updateInfo: () => void;
}

const ProfileEditBox = ({ setPw, setName, pwValidation, updateInfo }: Props) => {
  // 수정 버튼 클릭 여부
  const [isEditPw, setIsEditPw] = useState<boolean>(false);
  const [isEditName, setIsEditName] = useState<boolean>(false);

  return (
    <div className={styles.infoBox}>
      <div className={styles.infoBox__title}>내 정보 수정</div>
      <div className={styles.infoBox__body}>
        <div className={styles.infoBox__body__editPw}>
          <div className={styles.infoBox__body__editPw__label}>비밀번호 수정</div>
          {isEditPw ? (
            <InputBox placeHolder="pw" handleData={setPw}></InputBox>
          ) : (
            <Button text="수정하기" onClick={() => setIsEditPw(true)}></Button>
          )}
          <div className={pwValidation ? styles.noErrorMsg : styles.errorMsg}>
            비밀번호 형식이 올바르지 않습니다 (9~12자 영문자, 숫자 조합)
          </div>
        </div>
        <div className={styles.infoBox__body__editName}>
          <div className={styles.infoBox__body__editName__label}>내 이름 수정</div>
          {isEditName ? (
            <InputBox placeHolder="name" handleData={setName}></InputBox>
          ) : (
            <Button text="수정하기" onClick={() => setIsEditName(true)}></Button>
          )}
        </div>
      </div>
      {(isEditPw || isEditName) && <Button text="수정완료" onClick={updateInfo}></Button>}
    </div>
  );
};

export default ProfileEditBox;
