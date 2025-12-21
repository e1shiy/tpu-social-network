import { StateCreator } from "zustand/vanilla";
import {Store} from "./store.ts";

export type UserState = {
    userId: string | null,
    accessToken: string | null,
    login: (userId: string) => void;
    logout: () => void;
    setAccessToken: (token: string) => void;
}

export const createUserSlice: StateCreator<Store, [], [], UserState> = (set, ) => ({
    userId: "1", // todo null
    accessToken: "1", // todo null
    login: (userId: string) => set({ userId }),
    logout: () => set({ userId: null, accessToken: null }),
    setAccessToken: (token: string) => set({ accessToken: token }),
})