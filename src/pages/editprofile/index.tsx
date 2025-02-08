import React, { useState } from "react";
import styles from "./styles/editprofile.module.scss";
import Button from "@/components/common/button/Button";
import InputBox from "@/components/common/input/InputBox";
import NavBar from "@/components/common/navigation/NavBar";
import Modal from "@/components/common/modal/Modal";

function index() {
  const [preferParty, setPreferParty] = useState<string>();
  const [preferPolitician, setPreferPolitician] = useState<string>();
  const prevId = sessionStorage.getItem("id"); //서버 api호출시 파라미터로 이용위한 기존 id값
  const [id, setId] = useState<string>();
  const [pw, setPw] = useState<string>();
  const [name, setName] = useState<string>();

  const [isEditId, setIsEditId] = useState<boolean>(false);
  const [isEditPw, setIsEditPw] = useState<boolean>(false);
  const [isEditName, setIsEditName] = useState<boolean>(false);

  const [idValidation, setIdValidation] = useState<boolean>(true);
  const [pwValidation, setPwValidation] = useState<boolean>(true);

  const [modalAvailable, setModalAvailable] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>();
  const [modalData, setModalData] = useState<string>();

  // const idFormatCheck = (id: string) => {
  //   const regex = /^[a-zA-Z0-9]{4,12}$/;
  //   if (!regex.test(id) || id === undefined) {
  //     setIdValidation(false);
  //   } else {
  //     setIdValidation(true);
  //   }
  //   return;
  // };

  const pwFormatCheck = (pw: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,12}$/;
    if (!regex.test(pw)) {
      setPwValidation(false);
    } else {
      setPwValidation(true);
    }
    return;
  };

  const updateInfo = async () => {
    // if (isEditId) {
    //   idFormatCheck(id);
    // }
    if (isEditPw) {
      pwFormatCheck(pw);
    }

    // if (isEditId) {
    //   const isIdValid = /^[a-zA-Z0-9]{4,12}$/.test(id); // id 유효성 체크
    //   if (!isIdValid) {
    //     return;
    //   }
    // }
    if (isEditPw) {
      const isPwValid = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,12}$/.test(pw); // pw 유효성 체크
      if (!isPwValid) {
        return;
      }
    }

    const response = await fetch(`https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/edit/info?id=${prevId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        pw: pw,
        nickname: name,
      }),
    });

    if (response.status === 200) {
      alert("수정완료 되었습니다!");
    } else {
      console.error(response.status);
    }
  };

  const updateInterest = async () => {
    const response = await fetch(`https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/edit/interest?id=${prevId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        party: preferParty,
        politician: preferPolitician,
      }),
    });

    if (response.status === 200) {
      alert("수정완료 되었습니다!");
    } else {
      console.error(response.status);
    }
  };

  const openPartyModal = () => {
    setModalAvailable(true);
    setModalType("정당");
  };

  const openPoliticianModal = () => {
    setModalAvailable(true);
    setModalType("정치인");
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
        <div className={styles.page__contents__infoBox}>
          <div className={styles.page__contents__infoBox__title}>내 정보 수정</div>
          <div className={styles.page__contents__infoBox__body}>
            {/* <div className={styles.page__contents__infoBox__body__editId}>
              <div className={styles.page__contents__infoBox__body__editId__label}>아이디 수정</div>

              {isEditId ? <InputBox placeHolder="id" handleData={setId}></InputBox> : <Button text="수정하기" onClick={() => setIsEditId(true)}></Button>}
              <div className={idValidation ? styles.noErrorMsg : styles.errorMsg}>아이디 형식이 올바르지 않습니다 (4~12자 영문자 또는 숫자)</div>
            </div> */}
            <div className={styles.page__contents__infoBox__body__editPw}>
              <div className={styles.page__contents__infoBox__body__editPw__label}>비밀번호 수정</div>
              {isEditPw ? (
                <InputBox placeHolder="pw" handleData={setPw}></InputBox>
              ) : (
                <Button text="수정하기" onClick={() => setIsEditPw(true)}></Button>
              )}
              <div className={pwValidation ? styles.noErrorMsg : styles.errorMsg}>비밀번호 형식이 올바르지 않습니다 (9~12자 영문자, 숫자 조합)</div>
            </div>
            <div className={styles.page__contents__infoBox__body__editName}>
              <div className={styles.page__contents__infoBox__body__editName__label}>내 이름 수정</div>
              {isEditName ? (
                <InputBox placeHolder="name" handleData={setName}></InputBox>
              ) : (
                <Button text="수정하기" onClick={() => setIsEditName(true)}></Button>
              )}
            </div>
          </div>
          {(isEditId || isEditPw || isEditName) && <Button text="수정완료" onClick={updateInfo}></Button>}
        </div>
        <div className={styles.page__contents__preferBox}>
          <div className={styles.page__contents__preferBox__title}>나의 관심사 수정</div>
          <div className={styles.page__contents__preferBox__body}>
            <div className={styles.page__contents__preferBox__body__editParty}>
              <div className={styles.page__contents__preferBox__body__editParty__label}>관심 정당</div>
              <input className={styles.page__contents__preferBox__body__editParty__text} placeholder={preferParty} readOnly />
              {/* <InputBox placeHolder={preferParty} handleData={setPreferParty}></InputBox> */}
              <Button text="수정하기" onClick={openPartyModal}></Button>
            </div>
            <div className={styles.page__contents__preferBox__body__editPolitician}>
              <div className={styles.page__contents__preferBox__body__editPolitician__label}>관심 정치인</div>
              <input className={styles.page__contents__preferBox__body__editPolitician__text} placeholder={preferPolitician} readOnly />

              {/* <InputBox placeHolder={preferPolitician} handleData={setPreferPolitician}></InputBox> */}
              <Button text="수정하기" onClick={openPoliticianModal}></Button>
            </div>
          </div>
          <Button text="수정완료" onClick={updateInterest}></Button>
        </div>
      </div>
    </div>
  );
}

export default index;
