/* Date 타입 변수에 대한 포맷팅 함수 모음 */

export type DatePiece = Date | null;

// DatePiece 타입을 인자로 받아 yyyy년 m월 d일 타입의 문자열 반환
export const formatDateToKorean = (date: DatePiece): string => {
  return date
    ? date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""; // date가 null일 경우 빈 문자열 반환
};

// DatePiece 타입의 변수를 인자로 받아 "YY-mm-dd" 형태의 문자열로 반환
export const formatSelectedDateToDash = (
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

// 다른 시간대의 Date 객체를 UTC 표준시간대의 Date객체로 변환하여 리턴
export const formatToUTCDate = (date: Date): Date => {
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};
