import { atom } from "recoil";

const getCurYear = () => {
  let today = new Date();
  return today.getFullYear();
};

export const yearState = atom<number>({
  key: "yearState",
  default: getCurYear(),
});
