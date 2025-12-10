import {useState} from "react"
import UserDropdownButton from "./UserDropdownButton"
import ButtonMenu from "../ButtonMenu.tsx"
import avatarUrl from "../../assets/images/image.png"
import UserIcon from "../../assets/images/user.svg?react"
import FriendsIcon from "../../assets/images/two_users.svg?react"
import SettingsIcon from "../../assets/images/settings.svg?react"
import LogoutIcon from "../../assets/images/log-out.svg?react"
import type {NavHandlers} from "../../providers/NavHandlersProvider.tsx";
import {useNavHandlers} from "../../hooks/useNavHandlers.ts";
import isCorrectLocation from "../../utils/isCorrectLocation.ts";
import {useLocation} from "react-router-dom";
import {FRIENDS_ROUTE, PROFILE_ROUTE} from "../../constants/routes.ts";

interface UserDropdown {
    userId: string,
}

function UserDropdown({userId}: UserDropdown) {
    const [isActive, setIsActive] = useState<boolean>(false)
    const {onFriendsClick, onProfileClick}: NavHandlers = useNavHandlers()
    const location = useLocation()

    // todo user info
    const userName = "Веретнов Алексей"
    const userAvatarUrl = avatarUrl

    return (
        <div className="relative shrink-0">
            <UserDropdownButton
                avatarUrl={userAvatarUrl}
                isActive={isActive}
                onClick={() => setIsActive(i => !i)}
            >
                {userName}
            </UserDropdownButton>

            {isActive && <ButtonMenu
                className={`
                absolute top-full translate-y-1.25 md:translate-y-1.75 xl:translate-y-2.5 w-full
                rounded-md md:rounded-lg lg:rounded-[0.625rem] min-w-max right-0
                `}
                buttons={[
                    {children: "Профиль", TrailingIcon: UserIcon, onClick: () => onProfileClick(userId), isActive: isCorrectLocation(PROFILE_ROUTE(userId), location)},
                    {children: "Друзья", TrailingIcon: FriendsIcon, onClick: onFriendsClick, isActive: isCorrectLocation(FRIENDS_ROUTE, location)},
                    {children: "Настройки", TrailingIcon: SettingsIcon, onClick: () => { /* TODO: settings */ }, isActive: false }, // TODO path check
                    {children: "Выйти из аккаунта", TrailingIcon: LogoutIcon, onClick: () => { /* TODO: logout */}, isActive: false}, // TODO path check
                ]}/>
            }
        </div>
    )
}

export default UserDropdown