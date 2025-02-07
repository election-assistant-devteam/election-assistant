import { atom } from "recoil";

export const prevMainNum = atom<number>({
  key: "prevMainNum",
  default: 0,
});
