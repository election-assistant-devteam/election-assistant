import { selector } from "recoil";
import { yearState } from "../atoms/year";

const userId = sessionStorage.getItem("id");

export const eventData = selector({
  key: "eventData",
  get: async ({ get }) => {
    const yearValue = get(yearState);
    const PATH = `/calendar/schedules?userId=${userId}&year=${yearValue}`;
    const access_token = sessionStorage.getItem("access-token");

    const headers = {
      "Content-Type": "application/json",
      ...(access_token && { Authorizaton: `Bearer ${access_token}` }),
    };

    try {
      const response = await fetch(PATH, {
        method: "GET",
        headers,
      });
      const result = await response.json();
      if (result.code === 20000) {
        // console.log(result);
        return result.data.calendar;
      } else {
        console.log(result.message);
      }
    } catch (e) {
      console.error(e);
    }
  },
});
