import { selector } from "recoil";
import { yearState } from "../atoms/year";
import { monthState } from "../atoms/month";

export const eventData = selector({
  key: "eventData",
  get: async ({ get }) => {
    const yearValue = get(yearState);
    const monthValue = get(monthState);

    try {
      const res = await fetch(`/calendar/schedules?year=${yearValue}&month=${monthValue}`, {
        method: "GET",
      });
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  },
});
