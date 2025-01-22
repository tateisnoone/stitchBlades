import { atom } from "jotai";

type User = {
  user: {
    id: string;
  };
};

export const userAtom = atom<User | null>(null);
