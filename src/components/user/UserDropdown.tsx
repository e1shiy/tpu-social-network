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

interface UserDropdown {
    userId: string,
}

function UserDropdown({userId}: UserDropdown) {
    const [isActive, setIsActive] = useState<boolean>(false)
    const {onFriendsClick, onProfileClick}: NavHandlers = useNavHandlers()

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
                className={"absolute top-full translate-y-1.25 md:translate-y-1.75 xl:translate-y-2.5 w-full"}
                buttons={[
                    {children: "Профиль", TrailingIcon: UserIcon, onClick: () => onProfileClick(userId)},
                    {children: "Друзья", TrailingIcon: FriendsIcon, onClick: onFriendsClick},
                    {children: "Настройки", TrailingIcon: SettingsIcon, onClick: () => { /* TODO: settings */ }},
                    {children: "Выйти из аккаунта", TrailingIcon: LogoutIcon, onClick: () => { /* TODO: logout */}},
                ]}/>
            }
        </div>
    )
}

export default UserDropdown