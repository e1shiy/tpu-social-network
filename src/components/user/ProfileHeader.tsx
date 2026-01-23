import clsx from "clsx";
import {twMerge} from "tailwind-merge";
import avatarUrl from "../../assets/images/user-avatar.jpg";
import TextButton from "../buttons/TextButton.tsx";
import Card from "../wrappers/Card.tsx";
import ProfileInfo from "./ProfileInfo.tsx";
import ProfileAvatar from "./ProfileAvatar.tsx";
import SlideDown from "../wrappers/animations/SlideDown.tsx";
import {AnimatePresence} from "framer-motion";

interface UserProfileHeaderProps {
    actions?: React.ReactNode,
    isInfoActive: boolean,
}

function ProfileHeader({actions, isInfoActive = false}: UserProfileHeaderProps) {
    // todo user info
    const userAvatarUrl = avatarUrl
    const userName = "Веретнов Алексей"
    const isOnline = true
    const userLastEntryDate = isOnline ? "В сети" : "Был в сети 29.09.2025 в 20:55"
    const userSchool = "ИШИТР"
    const userGroup = "8К43"
    const userCourse = "Программная инженерия"
    const userClass = "2"

    const userShared = <>
        <TextButton className="text-dark/60 font-normal truncate max-w-full">25345 друзей</TextButton>
        <TextButton className="text-dark/60 font-normal truncate max-w-full">3 подписки</TextButton>
    </>

    return (
        <Card className={`w-full flex flex-col items-stretch gap-4 md:gap-5`}>
            <div className={"flex max-md:flex-col items-start justify-between md:items-stretch gap-4 md:gap-5"}>
                <div className={twMerge(clsx(`flex items-center justify-start gap-4 md:gap-5 h-full max-w-full min-w-0`))}>
                    <ProfileAvatar avatarUrl={userAvatarUrl} isOnline={isOnline}/>
                    <div className={twMerge(clsx(`flex flex-col gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 min-w-0 max-w-full`))}>
                        <div className="flex flex-col items-start max-w-full">
                            <h2 className="truncate">{userName}</h2>
                            <p className={`${isOnline ? "text-primary" : "text-dark/60"} text-start font-normal truncate max-w-full`}>
                                {userLastEntryDate}
                            </p>
                        </div>

                        <div className="max-md:hidden">{actions}</div>

                        <div className={twMerge(clsx(`flex flex-col md:hidden items-start max-w-full`))}>
                            {userShared}
                        </div>
                    </div>
                </div>

                <div className={twMerge(clsx(
                    `max-md:hidden flex flex-col items-end justify-between text-dark/60 py-2.5 shrink-0`
                ))}>
                    <div className={"flex flex-col items-end"}>
                        <p>{userSchool} ТПУ, {userGroup}</p>
                        <p>{userCourse}, {userClass} курс</p>
                    </div>

                    <div className={twMerge(clsx(`flex flex-col items-end`))}>
                        {userShared}
                    </div>
                </div>

                <div className="md:hidden w-full">{actions}</div>
            </div>

            <AnimatePresence>
                {isInfoActive &&
                    <SlideDown>
                        <ProfileInfo className={"flex flex-col items-stretch gap-4 md:gap-5"}/>
                    </SlideDown>
                }
            </AnimatePresence>

        </Card>
    )
}

export default ProfileHeader