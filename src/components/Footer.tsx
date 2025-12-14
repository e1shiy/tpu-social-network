import ButtonMenu from "./ButtonMenu.tsx";
import MessengerIcon from "../assets/images/message.svg?react"
import InboxIcon from "../assets/images/inbox.svg?react"
import CommunitiesIcon from "../assets/images/three_users.svg?react"
import ScheduleIcon from "../assets/images/calendar.svg?react"
import type {NavHandlers} from "../providers/NavHandlersProvider.tsx";
import {useNavHandlers} from "../hooks/useNavHandlers.ts";
import {useLocation} from "react-router-dom";
import isCorrectLocation from "../utils/isCorrectLocation.ts";
import {COMMUNITIES_ROUTE, INBOX_ROUTE, MESSENGER_ROUTE, SCHEDULE_ROUTE} from "../constants";

function Footer() {
    const {onMessengerClick, onCommunitiesClick, onScheduleClick, onInboxClick}: NavHandlers = useNavHandlers()
    const location = useLocation()

    return (
        <ButtonMenu
            className={`
            flex-row w-full absolute top-[100vh] -translate-y-full lg:hidden
            `}
            buttons={[
                {
                    className: "grow py-2 sm:py-2 md:py-2",
                    TrailingIcon: MessengerIcon,
                    onClick: onMessengerClick,
                    isActive: isCorrectLocation(MESSENGER_ROUTE, location)
                },
                {
                    className: "grow py-2 sm:py-2 md:py-2",
                    TrailingIcon: CommunitiesIcon,
                    onClick: onCommunitiesClick,
                    isActive: isCorrectLocation(COMMUNITIES_ROUTE, location)
                },
                {
                    className: "grow py-2 sm:py-2 md:py-2",
                    TrailingIcon: ScheduleIcon,
                    onClick: onScheduleClick,
                    isActive: isCorrectLocation(SCHEDULE_ROUTE, location)
                },
                {
                    className: "grow py-2 sm:py-2 md:py-2",
                    TrailingIcon: InboxIcon,
                    onClick: onInboxClick,
                    isActive: isCorrectLocation(INBOX_ROUTE, location)
                },
            ]}/>
    )
}

export default Footer