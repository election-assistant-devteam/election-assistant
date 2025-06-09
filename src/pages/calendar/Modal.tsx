import React, { RefObject } from "react";
import styles from "./Modal.module.scss";
import { useNavigate } from "react-router-dom";
// icons
import { GiCancel } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";

interface Props {
  formattedDate: String;
  setModalAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDateEvent: any[];
  deleteCustomEvent: (any) => void;
  writeAvailable: boolean;
  inputRef: RefObject<HTMLInputElement>;
  setEvent: () => void;
  modalChildCount: number;
  writeCustomEvent: (any) => void;
}

const Modal = ({
  formattedDate,
  setModalAvailable,
  selectedDateEvent,
  deleteCustomEvent,
  writeAvailable,
  inputRef,
  setEvent,
  modalChildCount,
  writeCustomEvent,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.modal}>
      <div className={styles.modal__header}>
        <div className={styles.modal__header__date}>{formattedDate}</div>
        <GiCancel
          color="#21005d"
          size="30"
          className={styles.modal__header__icon}
          onClick={() => {
            setModalAvailable(false);
          }}
        />
      </div>
      <div
        className={styles.modal__body}
        id="modal-body"
        // ref={modalBodyHandling}
      >
        {selectedDateEvent
          .filter((event, index) => event.isElection === true)
          .map((event, index) => (
            <div
              className={`${styles.modal__body__event} ${styles.election}`}
              key={index}
              onClick={() => navigate(`/candidate/${event.electionId}`, { state: event.name })}
            >
              {event.name}
            </div>
          ))}
        {selectedDateEvent
          .filter((event, index) => event.isCustom === true)
          .map((event, index) => (
            <div className={`${styles.modal__body__event} ${styles.custom}`} key={event.id}>
              {event.name}
              <GiCancel
                color="#21005d"
                size="20"
                className={styles.modal__body__event__icon}
                onClick={() => {
                  void deleteCustomEvent(event.id);
                }}
              />
            </div>
          ))}
        {writeAvailable && (
          <div className={styles.modal__body__inputBox}>
            <input type="text" ref={inputRef} className={styles.modal__body__inputBox__inputTag} />
            <button className={styles.modal__body__inputBox__writeButton} onClick={setEvent}>
              추가
            </button>
          </div>
        )}
      </div>
      {modalChildCount <= 4 && (
        <IoIosAddCircle
          color="#21005d"
          size="50"
          className={styles.addEvents}
          onClick={writeCustomEvent}
        />
      )}
    </div>
  );
};

export default Modal;
