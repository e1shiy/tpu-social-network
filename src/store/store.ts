import { create } from 'zustand'
import {createUserSlice, UserState} from "./userSlice.ts";
import {createPopUpSlice, PopUpState} from "./popUpStore.ts";

export type Store = UserState & PopUpState
export const useStore = create<Store>((...a) => ({
    ...createUserSlice(...a),
    ...createPopUpSlice(...a)
}))