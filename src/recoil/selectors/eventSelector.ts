import { selector } from "recoil";
import { yearState } from "../atoms/year";

//"https://d282ffdd-b1e5-4e5a-bebc-2a161c592cb5.mock.pstmn.io/calendar/schedules?year=${yearValue}"
// `http://54.180.165.220/api/calendar/schedules?userId=${userId}&year=${yearValue}`
const userId = sessionStorage.getItem("id");

export const eventData = selector({
  key: "eventData",
  get: async ({ get }) => {
    const yearValue = get(yearState);
    const ENDPOINT = `http://localhost:9001/api/calendar/schedules?userId=${userId}&year=${yearValue}`;
    const access_token = sessionStorage.getItem("access-token");

    const headers = {
      "Content-Type": "application/json",
      ...(access_token && { Authorizaton: `Bearer ${access_token}` }),
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: "GET",
        headers,
      });
      if (res.status === 200) {
        const result = await res.json();
        return result.data.calendar;
      }
    } catch (e) {
      console.error(e);
    }
  },
});
