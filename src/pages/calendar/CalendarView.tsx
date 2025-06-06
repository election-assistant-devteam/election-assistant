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
import {
  DatePiece,
  formatDateToKorean,
  formatSelectedDateToDash,
  formatToUTCDate,
} from "@/utils/formatter";
import Modal from "./Modal";
import EventTagBox from "./EventTagBox";

type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface Event {
  date: Date;
  title: string;
}

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date()); // Calendar에서 선택된 날짜
  const navigate = useNavigate();
  /*recoil state value*/
  const scheduledata = useRecoilValueLoadable(eventData); // api통신으로 얻은 이벤트 데이터
  const yearValue = useRecoilValue(yearState); // 현재의 연도
  const setYearValue = useSetRecoilState(yearState);

  // Calendar 컴포넌트를 제어하기위한 상태 변수 (리렌더링 되었을때 표시 날짜)
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const inputRef = useRef<HTMLInputElement>(null); //사용자 정의 일정 데이터

  const modalRef = useRef<HTMLDivElement>(null);
  const [modalChildCount, setModalChildCount] = useState(0);

  const [selectedDateEvent, setSelectedDateEvent] = useState([]);
  const [writeAvailable, setWriteAvailable] = useState<boolean>(false); //사용자 정의 일정 입력 태그 활성화여부
  const [modalAvailable, setModalAvailable] = useState<boolean>(false); //모달창 활성화여부

  const formattedDate = Array.isArray(selectedDate)
    ? `${formatDateToKorean(selectedDate[0])} ~ ${formatDateToKorean(selectedDate[1])}`
    : formatDateToKorean(selectedDate); // 모달창에 표시될 텍스트

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

  //커스텀 이벤트를 삭제하는 메서드
  const deleteCustomEvent = async (eventId) => {
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
        if (item.date === formatSelectedDateToDash(selectedDate)) {
          item.issues.map((issue) => {
            eventArray.push(issue);
          });
        }
      });
      setSelectedDateEvent(eventArray);
    }
  };

  //모달창을 열었을때 해당하는 날짜의 이벤트를 표시하는 메서드
  const getEvent = () => {
    const eventArray = [];
    scheduledata.contents.map((item) => {
      if (item.date === formatSelectedDateToDash(selectedDate)) {
        item.issues.map((issue) => {
          eventArray.push(issue);
        });
      }
      setSelectedDateEvent(eventArray);
    });
  };

  //서버에 커스텀이벤트 등록 후 모달창에 보여주는 메서드
  const setEvent = async () => {
    console.log(formattedDate);
    //"https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/calendar/getschedules/success"
    const response = await fetch("http://13.124.154.53:80/api/calendar/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
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
        if (item.date === formatSelectedDateToDash(selectedDate)) {
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
    return (
      <div className={styles.page}>
        {modalAvailable && <div className={styles.overlay}></div>}
        <div className={styles.page__contents}>
          {/* 모달이 활성화되었을때 보여주는 UI */}
          {modalAvailable && (
            <Modal
              formattedDate={formattedDate}
              setModalAvailable={setModalAvailable}
              selectedDateEvent={selectedDateEvent}
              deleteCustomEvent={deleteCustomEvent}
              writeAvailable={writeAvailable}
              inputRef={inputRef}
              setEvent={setEvent}
              modalChildCount={modalChildCount}
              writeCustomEvent={writeCustomEvent}
            />
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
              /* Calendar 컴포넌트의 tileContent prop에서 쓰는 date는 KST시간대 기준이고
              api호출을 통해 가져온 날짜 데이터는 string이므로 타입 변환이 필요합니다
              */
              scheduledata.contents.map((e) => {
                // console.log("date from calnedar", typeof date, date);
                // console.log("date from api", typeof e.date, e.date);
                const utcCalendarDate = formatToUTCDate(date);
                // console.log(new Date(e.date).getTime() === utcCalendarDate.getTime());
                if (new Date(e.date).getTime() === utcCalendarDate.getTime()) {
                  e.issues.map((item) => {
                    eventName.push(item.name);
                  });
                }
              });

              return <EventTagBox eventName={eventName} />;
            }}
            value={selectedDate}
            activeStartDate={activeStartDate}
            onClickDay={(date) => {
              setSelectedDate(date);
              setModalAvailable(true);
            }}
            formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })}
            onActiveStartDateChange={({ action, view, value, activeStartDate }) => {
              //달력의 페이지의 연도가 바뀌면 yearValue atom값을 다시 셋팅해줌
              setActiveStartDate(activeStartDate);
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

export default CalendarView;
