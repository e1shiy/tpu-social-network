import {StateCreator} from "zustand";

interface PopUpItem {
    id: number | string,
    status: "info" | "success" | "error",
    children: React.ReactNode
}

export interface PopUpState {
    popUps: PopUpItem[],
    showPopUp: (message: React.ReactNode, status: PopUpItem["status"]) => void
    hidePopUp: (id: number | string) => void
}

export const createPopUpSlice: StateCreator<PopUpState> = (set) => ({
    popUps: [],
    showPopUp: (message, status) => set(state => ({
        popUps: [...state.popUps, {id: crypto.randomUUID(), children: message, status}]
    })),
    hidePopUp: (id) => set(state => ({
        popUps: state.popUps.filter(p => p.id != id)
    }))
})