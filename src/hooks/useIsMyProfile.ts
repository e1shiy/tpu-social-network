import {useParams} from "react-router-dom";
import {useStore} from "../store/store.ts";

export function useIsMyProfile(): boolean | null
export function useIsMyProfile(id: number | string): boolean | null

export function useIsMyProfile(id?: number | string) {
    const { id: paramsId } = useParams()
    if (id == null && paramsId == null) {
        console.error("No ID provided")
        return null
    }

    const userId = useStore().userId
    if (userId === null) {
        return null
    }
    return (id ?? paramsId) == userId
}