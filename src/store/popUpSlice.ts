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
        popUps: [...state.popUps, {id: Date.now() * Math.random(), children: message, status}] // todo id: crypto.randomUUID()
    })),
    hidePopUp: (id) => set(state => ({
        popUps: state.popUps.filter(p => p.id != id)
    }))
})