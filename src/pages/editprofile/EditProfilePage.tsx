import { useState } from "react";
import styles from "./styles/editprofile.module.scss";
import NavBar from "@/components/common/navigation/NavBar";
import Modal from "@/components/common/modal/Modal";
import { formatChecker } from "@/utils/formatChecker";
import { apiCall } from "@/services/authServices";
import ProfileEditBox from "./profileeditbox/ProfileEditBox";
import PreferenceEditBox from "./preferenceeditbox/PreferenceEditBox";

const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,12}$/;

function EditProfilePage() {
  const [preferParty, setPreferParty] = useState<string>();
  const [preferPolitician, setPreferPolitician] = useState<string>();

  const prevId = sessionStorage.getItem("id"); //서버 api호출시 파라미터로 이용위한 기존 id값

  const [pw, setPw] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [pwValidation, setPwValidation] = useState<boolean>(true);

  const [modalAvailable, setModalAvailable] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>();

  // 아이디 & 비밀번호 업데이트 함수
  const updateInfo = async () => {
    const isPwValid = formatChecker(pw, PW_REGEX);
    setPwValidation(isPwValid);

    if (!isPwValid) {
      return;
    }

    const data = { password: pw, nickname: name };
    const PATH = `/users/update?prevId=${prevId}`;

    const response = await apiCall(PATH, "POST", data);

    if (response.code === 20000) {
      alert("수정완료 되었습니다!");
    } else {
      console.error(response.status);
    }
  };

  // 선호 정치인 & 정당 업데이트 함수
  const updateInterest = async () => {
    const data = {
      partyOfInterest: preferParty,
      politicianOfInterest: preferPolitician,
    };
    const PATH = `/edit/preference?prevId=${prevId}`;
    const response = await apiCall(PATH, "POST", data);

    if (response.code === 20000) {
      alert("수정완료 되었습니다!");
    } else {
      console.error(response);
    }
  };

  return (
    <div className={styles.page}>
      <NavBar text="내 정보 수정"></NavBar>
      {modalAvailable && <div className={styles.overlay}></div>}
      {modalAvailable && (
        <Modal
          type={modalType}
          available={(val: boolean) => setModalAvailable(val)}
          data={modalType === "정당" ? setPreferParty : setPreferPolitician}
        ></Modal>
      )}

      <div className={styles.page__contents}>
        <ProfileEditBox
          setPw={setPw}
          setName={setName}
          pwValidation={pwValidation}
          updateInfo={updateInfo}
        />
        <PreferenceEditBox
          setModalAvailable={setModalAvailable}
          setModalType={setModalType}
          preferParty={preferParty}
          preferPolitician={preferPolitician}
          updateInterest={updateInterest}
        />
      </div>
    </div>
  );
}

export default EditProfilePage;
