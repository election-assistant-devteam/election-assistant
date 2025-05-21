import { selector } from "recoil";
import { yearState } from "../atoms/year";

//"https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/calendar/schedules?year=${yearValue}"

const userId = sessionStorage.getItem("id");

export const eventData = selector({
  key: "eventData",
  get: async ({ get }) => {
    const yearValue = get(yearState);

    try {
      const res = await fetch(
        `http://54.180.165.220/api/calendar/schedules?userId=${userId}&year=${yearValue}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        const result = await res.json();
        return result.data.calendar;
      }
    } catch (e) {
      console.error(e);
    }
  },
});
