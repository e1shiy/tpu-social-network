import {useParams} from "react-router-dom";
import {useStore} from "../store/store.ts";

export const useIsMyProfile = () => {
    const { id: paramsId } = useParams()
    if (paramsId === null) {
        console.error("No ID provided in get-params")
        return null
    }

    const userId = useStore().userId
    if (userId === null) {
        return
    }
    return paramsId == userId
}