import ButtonMenu from "../ButtonMenu.tsx"
import ChevronRight from "../../assets/images/chevron-right.svg?react"
import avatarUrl from "../../assets/images/image.png"
import UserIcon from "../../assets/images/user.svg?react"
import FriendsIcon from "../../assets/images/two_users.svg?react"
import SettingsIcon from "../../assets/images/settings.svg?react"
import LogoutIcon from "../../assets/images/log-out.svg?react"
import type {NavHandlers} from "../../providers/NavHandlersProvider.tsx";
import {useNavHandlers} from "../../hooks/useNavHandlers.ts";
import isCorrectLocation from "../../utils/isCorrectLocation.ts";
import {useLocation} from "react-router-dom";
import {FRIENDS_ROUTE, PROFILE_ROUTE} from "../../constants";
import DropdownButton, {type ContentProps, type TriggerProps} from "../DropdownButton.tsx";
import {twMerge} from "tailwind-merge";
import clsx from "clsx";
import Button from "../Button.tsx";

interface UserDropdown {
    userId: string,
}

function UserDropdown({userId}: UserDropdown) {
    const {onFriendsClick, onProfileClick}: NavHandlers = useNavHandlers()
    const location = useLocation()

    // todo user info
    const userName = "Веретнов Алексей"
    const userAvatarUrl = avatarUrl

    const Trigger = ({isActive, onClick, className}: TriggerProps) => <Button
        className={twMerge(clsx(
            `py-[0.3125rem] sm:py-[0.32rem] md:py-[0.33rem] lg:py-[0.345rem] xl:py-[0.36rem] 2xl:py-[0.375rem] 
            max-sm:w-max`, className
        ))}
        onClick={onClick}
    >
        <img src={userAvatarUrl} className="aspect-square h-full rounded-full shrink-0" alt="avatar"/>
        <span className={"max-sm:hidden text-ellipsis text-nowrap overflow-hidden"}>{userName}</span>
        <ChevronRight className={twMerge(clsx(
            `h-4 sm:h-4.5 md:h-5 lg:h-5.3 xl:h-5.6 2xl:h-6 aspect-square text-current transition-transform shrink-0`,
            isActive && "rotate-90"
        ))}/>
    </Button>

    const Content = ({className, ref}: ContentProps) => <ButtonMenu
        className={twMerge(clsx(
            `rounded-md md:rounded-lg lg:rounded-[0.625rem] min-w-max right-0`, className
        ))}
        ref={ref}
        buttons={[
            {
                children: "Профиль",
                TrailingIcon: UserIcon,
                onClick: () => onProfileClick(userId),
                isActive: isCorrectLocation(PROFILE_ROUTE(userId), location)
            },
            {
                children: "Друзья",
                TrailingIcon: FriendsIcon,
                onClick: onFriendsClick,
                isActive: isCorrectLocation(FRIENDS_ROUTE, location)
            },
            {
                children: "Настройки", TrailingIcon: SettingsIcon, onClick: () => { /* TODO: settings */
                }, isActive: false
            }, // TODO path check
            {
                children: "Выйти из аккаунта", TrailingIcon: LogoutIcon, onClick: () => { /* TODO: logout */
                }, isActive: false
            }, // TODO path check
        ]}
    />

    return (
        <DropdownButton Trigger={Trigger} Content={Content}/>
    )
}

export default UserDropdown