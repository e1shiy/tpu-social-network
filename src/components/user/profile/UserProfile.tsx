import {UserProfileHeader} from "./index.ts";
import Button from "../../Button.tsx";
import InfoIcon from "../../../assets/images/info.svg?react"
import AddFriendIcon from "../../../assets/images/user-plus.svg?react"
import MessageIcon from "../../../assets/images/message-circle.svg?react"
import {useState} from "react";

interface UserProfileProps {
    id: string
}

function UserProfile({id} : UserProfileProps) {
    const [isInfoActive, setIsInfoActive] = useState(false)

    return(
        <div className="container flex flex-col gap-2.5 md:gap-4 lg:gap-5">
            <UserProfileHeader isInfoActive={isInfoActive} id={id} actions={
                <div className="flex gap-1.25 max-w-full">
                    <Button TrailingIcon={MessageIcon} className="w-full text-nowrap">Написать сообщение</Button>
                    <Button TrailingIcon={AddFriendIcon} className="sm:w-1/2">
                        <span className="max-sm:hidden md:hidden text-nowrap">Добавить в друзья</span>
                    </Button>
                    <Button TrailingIcon={InfoIcon} onClick={() => setIsInfoActive(i => !i)} isActive={isInfoActive} />
                </div>
            }/>
        </div>
    )
}

export default UserProfile