import {useNavigate} from "react-router-dom";
import {
    COMMUNITIES_ROUTE,
    FRIENDS_ROUTE,
    INBOX_ROUTE,
    MESSENGER_ROUTE,
    PROFILE_ROUTE,
    SCHEDULE_ROUTE
} from "../constants/routes.ts";
import {createContext} from "react";

export interface NavHandlers {
    onMessengerClick: () => void;
    onCommunitiesClick: () => void;
    onScheduleClick: () => void;
    onInboxClick: () => void;
    onFriendsClick: () => void;
    onProfileClick: (userId: string) => void;
}
export const NavHandlersContext = createContext<NavHandlers | undefined>(undefined)

interface NavHandlersProviderProps {
    children?: React.ReactNode;
}
function NavHandlersProvider({children}: NavHandlersProviderProps) {
    const navigate = useNavigate()
    const navHandlers: NavHandlers = {
        onMessengerClick: () => navigate(MESSENGER_ROUTE),
        onCommunitiesClick: () => navigate(COMMUNITIES_ROUTE),
        onScheduleClick: () => window.open(SCHEDULE_ROUTE),
        onInboxClick: () => window.open(INBOX_ROUTE),
        onFriendsClick: () => navigate(FRIENDS_ROUTE),
        onProfileClick: (userId: string) => navigate(PROFILE_ROUTE(userId)),
    }

    return (
        <NavHandlersContext.Provider value={navHandlers}>
            {children}
        </NavHandlersContext.Provider>
    )
}

export default NavHandlersProvider