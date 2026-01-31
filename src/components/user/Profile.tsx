import ProfileHeader from "./ProfileHeader.tsx";
import Button from "../buttons/Button.tsx";
import InfoIcon from "../../assets/images/info.svg?react"
import AddFriendIcon from "../../assets/images/user-plus.svg?react"
import MessageIcon from "../../assets/images/message-circle.svg?react"
import {useState} from "react";
import {useIsMyProfile} from "../../hooks";
import ProfilePostCreator from "../post/PostCreator.tsx";

function Profile() {
    const [isInfoActive, setIsInfoActive] = useState(false)
    const isMyProfile = useIsMyProfile()

    return(
        <div className="container flex flex-col gap-2.5 md:gap-4 lg:gap-5">
            <ProfileHeader/>
            {isMyProfile && <ProfilePostCreator/>}
        </div>
    )
}

export default Profile