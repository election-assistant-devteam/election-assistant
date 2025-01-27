import { atom } from "recoil";

const getCurMonth = () => {
  let today = new Date();
  return today.getMonth() + 1;
};

export const monthState = atom<number>({
  key: "monthState",
  default: getCurMonth(),
});
