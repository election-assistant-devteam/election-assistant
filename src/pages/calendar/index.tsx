import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import classNames from "classnames";
// import "react-calendar/dist/Calendar.css";
import styles from "./styles/calendar.module.scss";
import "./styles/Calendar.scss";
// import { SlArrowLeft } from "react-icons/sl";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import { PiCaretDoubleRightFill } from "react-icons/pi";
import { PiCaretDoubleLeftFill } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { eventData } from "@/recoil/selectors/eventSelector";
import { yearState } from "@/recoil/atoms/year";
import Loading from "@/components/common/loading/Loading";

type DatePiece = Date | null;

type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface Event {
  date: Date;
  title: string;
}

function index() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const navigate = useNavigate();
  /*recoil state value*/
  const scheduledata = useRecoilValueLoadable(eventData);
  const yearValue = useRecoilValue(yearState);
  const setYearValue = useSetRecoilState(yearState);

  const inputRef = useRef<HTMLInputElement>(null); //사용자 정의 일정 데이터

  const modalRef = useRef<HTMLDivElement>(null);
  const [modalChildCount, setModalChildCount] = useState(0);

  const [selectedDateEvent, setSelectedDateEvent] = useState([]);
  const [writeAvailable, setWriteAvailable] = useState<boolean>(false); //사용자 정의 일정 입력 태그 활성화여부
  const [modalAvailable, setModalAvailable] = useState<boolean>(false); //모달창 활성화여부

  //*****날짜 포맷팅*****//
  const formatDateKorean = (date: DatePiece): string => {
    return date
      ? date.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : ""; // date가 null일 경우 빈 문자열 반환
  };

  const formattedDate = Array.isArray(selectedDate)
    ? `${formatDateKorean(selectedDate[0])} ~ ${formatDateKorean(selectedDate[1])}`
    : formatDateKorean(selectedDate);

  const formatSelectedDateDash = (
    selectedDate: DatePiece | [DatePiece, DatePiece]
  ): string | null => {
    if (selectedDate instanceof Date) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작
      const day = String(selectedDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`; // 로컬 시간 기준으로 변환
    } else {
      return null;
    }
  };

  //********************//

  useEffect(() => {
    if (modalAvailable) {
      getEvent();
    } else {
      setSelectedDateEvent([]);
    }
  }, [modalAvailable]);

  const writeCustomEvent = (event) => {
    //커스텀 이벤트 입력태그 활성화
    const target = event.currentTarget;
    if (writeAvailable) {
      setWriteAvailable(false);
      target.style.transformOrigin = "center";
      target.style.transform = "rotate(0deg)";
      target.style.transition = "transform 0.3s ease";
    } else {
      setWriteAvailable(true);
      target.style.transformOrigin = "center";
      target.style.transform = "rotate(-45deg)";
      target.style.transition = "transform 0.3s ease";
    }
  };

  const modalBodyHandling = () => {
    const targetNode = document.getElementById("modal-body");
    setModalChildCount(targetNode.children.length);
  };

  const deleteCustomEvent = async (eventId) => {
    //커스텀 이벤트를 삭제하는 메서드
    const response = await fetch(
      `https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/calendar/schedules/delete/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access")}`,
        },
      }
    );

    const result = await response.json();

    if (result.code === 20000) {
      const eventArray = [];
      result.data.calendar.map((item) => {
        if (item.date === formatSelectedDateDash(selectedDate)) {
          item.issues.map((issue) => {
            eventArray.push(issue);
          });
        }
      });
      setSelectedDateEvent(eventArray);
    }
  };

  const getEvent = () => {
    //모달창을 열었을때 해당하는 날짜의 이벤트를 표시하는 메서드
    const eventArray = [];
    scheduledata.contents.map((item) => {
      if (item.date === formatSelectedDateDash(selectedDate)) {
        item.issues.map((issue) => {
          eventArray.push(issue);
        });
      }
      setSelectedDateEvent(eventArray);
    });
  };

  const setEvent = async () => {
    //서버에 커스텀이벤트 등록 후 모달창에 보여주는 메서드
    //"https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/calendar/getschedules/success"
    const response = await fetch("http://localhost:9001/calendar/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        date: formattedDate,
        schedule: inputRef.current.value,
      }),
    });

    const result = await response.json();

    if (result.code === 20000) {
      const eventArray = [];
      result.data.calendar.map((item) => {
        if (item.date === formatSelectedDateDash(selectedDate)) {
          item.issues.map((issue) => {
            eventArray.push(issue);
          });
        }
      });
      setSelectedDateEvent(eventArray);
      setWriteAvailable(false);
    }
  };

  if (scheduledata.state === "hasValue") {
    // console.log(scheduledata.contents);
    return (
      <div className={styles.page}>
        {modalAvailable && <div className={styles.overlay}></div>}
        <div className={styles.page__contents}>
          {modalAvailable && (
            <div className={styles.page__contents__modal}>
              <div className={styles.page__contents__modal__header}>
                <div className={styles.page__contents__modal__header__date}>{formattedDate}</div>
                <GiCancel
                  color="#21005d"
                  size="30"
                  className={styles.page__contents__modal__header__icon}
                  onClick={() => {
                    setModalAvailable(false);
                  }}
                />
              </div>
              <div
                className={styles.page__contents__modal__body}
                id="modal-body"
                ref={modalBodyHandling}
              >
                {selectedDateEvent
                  .filter((event, index) => event.isElection === true)
                  .map((event, index) => (
                    <div
                      className={`${styles.page__contents__modal__body__event} ${styles.election}`}
                      key={index}
                      onClick={() => navigate(`/candidate/${event.id}`)}
                    >
                      {event.name}
                    </div>
                  ))}
                {selectedDateEvent
                  .filter((event, index) => event.isCustom === true)
                  .map((event, index) => (
                    <div
                      className={`${styles.page__contents__modal__body__event} ${styles.custom}`}
                      key={event.id}
                    >
                      {event.name}
                      <GiCancel
                        color="#21005d"
                        size="20"
                        className={styles.page__contents__modal__body__event__icon}
                        onClick={() => {
                          void deleteCustomEvent(event.id);
                        }}
                      />
                    </div>
                  ))}
                {writeAvailable && (
                  <div className={styles.page__contents__modal__body__inputBox}>
                    <input
                      type="text"
                      ref={inputRef}
                      className={styles.page__contents__modal__body__inputBox__inputTag}
                    />
                    <button
                      className={styles.page__contents__modal__body__inputBox__writeButton}
                      onClick={setEvent}
                    >
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
          )}
          <div className={styles.page__contents__topBar}>
            <MdKeyboardArrowLeft
              color="#21005d"
              size="30"
              onClick={() => {
                navigate(-1);
              }}
              className={styles.page__contents__topBar__prevArrow}
            />
          </div>

          <Calendar
            tileContent={({ date, view }) => {
              const eventName = [];
              scheduledata.contents.map((e) => {
                if (e.date === formatSelectedDateDash(date)) {
                  e.issues.map((item) => {
                    eventName.push(item.name);
                  });
                }
              });

              return (
                <div className="eventTagBox">
                  {eventName.map((item, index) => (
                    <div key={index} className="eventTag">
                      {item}
                    </div>
                  ))}
                </div>
              );
            }}
            value={selectedDate}
            // onChange={(date) => {
            //   setSelectedDate(date);
            // }}
            onClickDay={(date) => {
              setSelectedDate(date);
              setModalAvailable(true);
            }}
            formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
            onActiveStartDateChange={({ action, view, value, activeStartDate }) => {
              //달력의 페이지의 연도가 바뀌면 yearValue atom값을 다시 셋팅해줌
              if (activeStartDate.getFullYear() !== yearValue) {
                setYearValue(activeStartDate.getFullYear());
                // console.log(activeStartDate.getFullYear());
              }
            }}
            prevLabel={<AiFillCaretLeft size="20" />}
            nextLabel={<AiFillCaretRight size="20" />}
            prev2Label={<PiCaretDoubleLeftFill size="20" />}
            next2Label={<PiCaretDoubleRightFill size="20" />}
          ></Calendar>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.loader}>
        <Loading></Loading>
      </div>
    );
  }
}

export default index;
