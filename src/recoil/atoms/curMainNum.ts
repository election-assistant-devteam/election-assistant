import { atom } from "recoil";

export const curMainNum = atom<number>({
  key: "curMainNum",
  default: 1,
});
