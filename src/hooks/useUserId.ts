import {useStore} from "../store/store.ts";

export const useUserId = () => {
    const userId = useStore().userId
    if (!userId) {
        throw new Error("userId is null")
    }
    return userId
}