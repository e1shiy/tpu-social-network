import clsx from "clsx";
import {twMerge} from "tailwind-merge";
import avatarUrl from "../../../assets/images/i.webp";
import TextButton from "../../TextButton.tsx";
import Card from "../../Card.tsx";
import {UserProfileInfo} from "./index.ts";
import {AnimatePresence, motion} from "framer-motion";

interface UserProfileHeaderProps {
    actions?: React.ReactNode,
    isInfoActive: boolean,
    id: string
}

function UserProfileHeader({actions, id, isInfoActive = false}: UserProfileHeaderProps) {
    // todo user info
    const userAvatarUrl = avatarUrl
    const userName = "Веретнов Алексей"
    const userBio = "23 y.o. designer from San Francisco"
    const userSchool = "ИШИТР"
    const userGroup = "8К43"
    const userCourse = "Программная инженерия"
    const userClass = "2"

    const userShared = <>
        <TextButton className="font-normal truncate max-w-full">25345 друзей</TextButton>
        <TextButton className="font-normal truncate max-w-full">3 подписки</TextButton>
    </>

    const MotionContent = motion.create(UserProfileInfo, {forwardMotionProps: true})

    return (
        <Card className={`w-full flex flex-col items-stretch gap-4 md:gap-5`}>
            <div className={"flex max-md:flex-col items-start justify-between md:items-stretch gap-4 md:gap-5"}>
                <div className={twMerge(clsx(`flex items-center justify-start gap-4 md:gap-5 h-full max-w-full min-w-0`))}>
                    <div className={twMerge(clsx(`
                            relative aspect-square rounded-full shrink-0 overflow-hidden h-25 sm:h-30 md:h-35 lg:h-40 xl:h-45 2xl:h-50
                            after:ring-dark/10 after:z-10 after:rounded-full after:ring-3 after:lg:ring-4 after:2xl:ring-5 after:ring-inset after:absolute after:inset-0
                        `))}>
                        <img className={twMerge(clsx(`aspect-square h-full`))} src={userAvatarUrl} alt="avatar"/>
                    </div>
                    <div className={twMerge(clsx(`flex flex-col gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 min-w-0 max-w-full`))}>
                        <div className="flex flex-col items-start max-w-full">
                            <h2 className="truncate">{userName}</h2>
                            <TextButton className="text-dark/60 text-start font-normal truncate max-w-full">
                                {userBio}
                            </TextButton>
                        </div>

                        <div className="max-md:hidden">{actions}</div>

                        <div className={twMerge(clsx(`flex flex-col md:hidden text-dark/60 items-start max-w-full`))}>
                            {userShared}
                        </div>
                    </div>
                </div>

                <div className={twMerge(clsx(`
                            max-md:hidden flex flex-col items-end justify-between text-dark/60 py-2.5 shrink-0
                `))}>
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
                {isInfoActive && <MotionContent
                    initial={{height: 0}}
                    animate={{height: "auto"}}
                    exit={{height: 0}}
                    transition={{duration: .1}}
                    id={id}
                    className={twMerge(clsx(
                        "overflow-hidden",
                        "flex flex-col items-stretch gap-4 md:gap-5"
                    ))}
                />}
            </AnimatePresence>
        </Card>
    )
}

export default UserProfileHeader