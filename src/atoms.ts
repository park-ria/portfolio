import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const selectedIndexAtom = atom<number>({
  key: "selectedIndex",
  default: -1,
});
