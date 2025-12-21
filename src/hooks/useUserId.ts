import {useStore} from "../store/store.ts";

export const useUserId = () => {
    const userId = useStore().userId
    if (!userId) {
        throw new Error("user_id is null")
    }
    return userId
}