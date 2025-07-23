import { selector } from "recoil";
import { yearState } from "../atoms/year";
import { apiCall } from "@/services/authServices";

const userId = sessionStorage.getItem("id");

export const eventData = selector({
  key: "eventData",
  get: async ({ get }) => {
    const yearValue = get(yearState);
    const PATH = `/calendar/schedules?userId=${userId}&year=${yearValue}`;

    const response = await apiCall(PATH, "GET", undefined, true);

    if (response.code === 20000) {
      console.log(response);
      return response.data.calendar;
    } else {
      console.error(response.error);
    }
  },
});
