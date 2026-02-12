import {useContext} from "react";
import {NavHandlersContext} from "../providers/NavHandlersProvider.tsx";

export const useNavHandlers = () => {
    const context = useContext(NavHandlersContext)
    if (context === undefined) {
        throw new Error("useNavHandlers must be used within the NavHandlersProvider")
    }
    return context
}