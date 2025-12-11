import { create } from 'zustand'
import {createUserSlice, UserState} from "./userSlice.ts";

export type Store = UserState
export const useStore = create<Store>((...a) => ({
    ...createUserSlice(...a)
}))