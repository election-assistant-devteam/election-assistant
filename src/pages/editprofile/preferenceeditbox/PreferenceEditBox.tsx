import Button from "@/components/common/button/Button";
import styles from "./PreferenceEditBox.module.scss";

interface Props {
  setModalAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  preferParty: string;
  preferPolitician: string;
  updateInterest: () => void;
}

const PreferenceEditBox = ({
  setModalAvailable,
  setModalType,
  preferParty,
  preferPolitician,
  updateInterest,
}: Props) => {
  const openPartyModal = () => {
    setModalAvailable(true);
    setModalType("정당");
  };

  const openPoliticianModal = () => {
    setModalAvailable(true);
    setModalType("정치인");
  };

  return (
    <div className={styles.preferBox}>
      <div className={styles.preferBox__title}>나의 관심사 수정</div>
      <div className={styles.preferBox__body}>
        <div className={styles.preferBox__body__editParty}>
          <div className={styles.preferBox__body__editParty__label}>관심 정당</div>
          <input
            className={styles.preferBox__body__editParty__text}
            placeholder={preferParty}
            readOnly
          />
          {/* <InputBox placeHolder={preferParty} handleData={setPreferParty}></InputBox> */}
          <Button text="수정하기" onClick={openPartyModal}></Button>
        </div>
        <div className={styles.preferBox__body__editPolitician}>
          <div className={styles.preferBox__body__editPolitician__label}>관심 정치인</div>
          <input
            className={styles.preferBox__body__editPolitician__text}
            placeholder={preferPolitician}
            readOnly
          />

          {/* <InputBox placeHolder={preferPolitician} handleData={setPreferPolitician}></InputBox> */}
          <Button text="수정하기" onClick={openPoliticianModal}></Button>
        </div>
      </div>
      <Button text="수정완료" onClick={updateInterest}></Button>
    </div>
  );
};

export default PreferenceEditBox;
