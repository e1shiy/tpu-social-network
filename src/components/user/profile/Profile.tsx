import {ProfileHeader} from "./index.ts";
import Button from "../../buttons/Button.tsx";
import InfoIcon from "../../../assets/images/info.svg?react"
import AddFriendIcon from "../../../assets/images/user-plus.svg?react"
import MessageIcon from "../../../assets/images/message-circle.svg?react"
import {useState} from "react";
import {useIsMyProfile} from "../../../hooks";

function Profile() {
    const [isInfoActive, setIsInfoActive] = useState(false)
    const isMyProfile = useIsMyProfile()

    return(
        <div className="container flex flex-col gap-2.5 md:gap-4 lg:gap-5">
            {isMyProfile ?
                <ProfileHeader isInfoActive={isInfoActive} actions={
                    <Button TrailingIcon={InfoIcon} isActive={isInfoActive} onClick={() => setIsInfoActive(i => !i)} className="w-full">Подробнее</Button>
                }/> :
                <ProfileHeader isInfoActive={isInfoActive} actions={
                    <div className="flex gap-1.25 max-w-full">
                        <Button TrailingIcon={MessageIcon} className="w-full text-nowrap">Написать сообщение</Button>
                        <Button TrailingIcon={AddFriendIcon} className="sm:w-1/2">
                            <span className="max-sm:hidden md:hidden text-nowrap">Добавить в друзья</span>
                        </Button>
                        <Button TrailingIcon={InfoIcon} onClick={() => setIsInfoActive(i => !i)} isActive={isInfoActive} />
                    </div>
                }/>
            }
        </div>
    )
}

export default Profile