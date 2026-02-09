import Logo from "./Logo.tsx";
import TextButton from "./buttons/TextButton.tsx";
import Button from "./buttons/Button.tsx";
import SearchIcon from "../assets/images/search.svg?react"
import LoginIcon from "../assets/images/log-in.svg?react"
import UserDropdown from "./user/UserDropdown.tsx";
import {type NavHandlers} from "../providers/NavHandlersProvider.tsx";
import {useNavHandlers} from "../hooks";
import {useLocation} from "react-router-dom";
import {COMMUNITIES_ROUTE, INBOX_ROUTE, MESSENGER_ROUTE, SCHEDULE_ROUTE} from "../constants/routes.ts";
import redirectToExternalAuth from "../services/authService.ts";
import {useStore} from "../store/store.ts";
import {cn} from "../utils/cn.ts";

function Header() {
    const {userId} = useStore()
    const {onMessengerClick, onCommunitiesClick, onScheduleClick, onInboxClick}: NavHandlers = useNavHandlers()
    const location = useLocation();
    const navLinks = <>
        <TextButton className="max-lg:hidden" onClick={onMessengerClick}
                    isActive={location.pathname === MESSENGER_ROUTE}>Мессенджер</TextButton>
        <TextButton className="max-lg:hidden" onClick={onCommunitiesClick}
                    isActive={location.pathname === COMMUNITIES_ROUTE}>Сообщества</TextButton>
        <TextButton className="max-lg:hidden" onClick={onScheduleClick}
                    isActive={location.pathname === SCHEDULE_ROUTE}>Расписание</TextButton>
        <TextButton className="max-lg:hidden" onClick={onInboxClick}
                    isActive={location.pathname === INBOX_ROUTE}>Почта</TextButton>
    </>

    return (
        <div className="w-full shadow sticky top-0 bg-white z-100">
            <div className="container flex items-center justify-between gap-7.5">
                <Logo/>
                <div className={cn(
                    "flex w-full justify-end items-center",
                    "gap-1.75 sm:gap-2.5 md:gap-3.5 lg:gap-4.65 xl:gap-6 2xl:gap-7.5"
                )}>
                    {navLinks}
                    <Button className="basis-25 lg:basis-50" TrailingIcon={SearchIcon}>
                        Поиск
                    </Button>
                    {userId
                        ?
                        <UserDropdown/>
                        :
                        <Button
                            className="basis-25 lg:basis-50" TrailingIcon={LoginIcon}
                            onClick={() => redirectToExternalAuth()}
                        >
                            Войти
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header