import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const selectedIndexAtom = atom<number>({
  key: "selectedIndex",
  default: -1,
});

export const careerIdAtom = atom<number>({
  key: "careerId",
  default: 3,
});

export const workScrollTopAtom = atom<number>({
  key: "workTop",
  default: 0,
});
