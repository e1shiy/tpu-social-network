import Logo from "./Logo.tsx";
import TextButton from "./TextButton.tsx";
import Button from "./Button.tsx";
import SearchIcon from "../assets/images/search.svg?react"
import LoginIcon from "../assets/images/log-in.svg?react"
import {UserDropdown} from "./user";
import {type NavHandlers} from "../providers/NavHandlersProvider.tsx";
import {useNavHandlers} from "../hooks/useNavHandlers.ts";

interface HeaderProps {
    userId: string | undefined;
}

function Header({userId}: HeaderProps) {
    const {onMessengerClick, onCommunitiesClick, onScheduleClick, onInboxClick}: NavHandlers = useNavHandlers()
    const navLinks = <>
        <TextButton className="max-lg:hidden" onClick={onMessengerClick}>Мессенджер</TextButton>
        <TextButton className="max-lg:hidden" onClick={onCommunitiesClick}>Сообщества</TextButton>
        <TextButton className="max-lg:hidden" onClick={onScheduleClick}>Расписание</TextButton>
        <TextButton className="max-lg:hidden" onClick={onInboxClick}>Почта</TextButton>
    </>

    return (
        <div className="
        w-full flex items-center justify-between gap-7.5
        p-4.25 sm:p-4.75 md:p-5 lg:p-5.5 xl:p-5.75 2xl:p-6.25
        ">
            <Logo/>
            <div className="
            w-full flex justify-end items-center
            gap-1.75 sm:gap-2.5 md:gap-3.5 lg:gap-4.65 xl:gap-6 2xl:gap-7.5
            ">
                {navLinks}
                {userId ?
                    <>
                        <Button className="basis-25 lg:basis-50" TrailingIcon={SearchIcon}>Поиск</Button>
                        <UserDropdown userId={userId}/>
                    </> :
                    <Button
                        className="basis-25 lg:basis-50" TrailingIcon={LoginIcon}
                        onClick={() => { /* TODO: login */ }}
                    >
                        Войти
                    </Button>
                }

            </div>
        </div>
    )
}

export default Header