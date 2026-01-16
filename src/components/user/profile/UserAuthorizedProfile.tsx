import {useUserId} from "../../../hooks";
import {UserProfileHeader} from "./index.ts";
import Button from "../../Button.tsx";
import InfoIcon from "../../../assets/images/info.svg?react"
import {useState} from "react";

function UserAuthorizedProfile() {
    const userId = useUserId()
    const [isInfoActive, setIsInfoActive] = useState(false)

    return(
        <div className="container flex flex-col gap-2.5 md:gap-4 lg:gap-5">
            <UserProfileHeader isInfoActive={isInfoActive} id={userId} actions={
                <Button TrailingIcon={InfoIcon} isActive={isInfoActive} onClick={() => setIsInfoActive(i => !i)} className="w-full">Подробнее</Button>
            }/>
        </div>
    )
}

export default UserAuthorizedProfile