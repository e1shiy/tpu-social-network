import TextCard from "../../TextCard.tsx";
import TextButton from "../../buttons/TextButton.tsx";
import type {Ref} from "react";
import {useIsMyProfile} from "../../../hooks";

interface UserProfileInfoProps {
    ref?: Ref<HTMLDivElement>;
    className?: string
}

function ProfileInfo({className, ref}: UserProfileInfoProps) {
    const isMyProfile = useIsMyProfile()
    // todo user info
    const userAbout = "Дизайн для меня — это способ общения. Вдохновляясь архитектурой города и ритмом Кремниевой долины, я помогаю стартапам и состоявшимся компаниям находить свой уникальный голос. Я не просто рисую пиксели, я строю мосты между продуктом и человеком. Всегда открыт к крутым коллаборациям и новым вызовам."
    const userLifePosition = "Меньше пикселей ради пикселей, больше пользы для людей. Эстетика в функции."

    return (
        <div className={className} ref={ref}>
            <div className={"flex max-md:flex-col gap-4 md:gap-5"}>
                <TextCard
                    className={"w-full"}
                    isReadonly={!isMyProfile}
                    title={"О себе"}
                    text={userAbout}
                    maxLength={500}
                    // todo update user abouts
                />
                <TextCard
                    className={"w-full"}
                    isReadonly={!isMyProfile}
                    title={"Жизненная позиция"}
                    text={userLifePosition}
                    maxLength={200}
                    // todo update user life pos
                />
            </div>
            <div className={"flex justify-between w-full text-dark/60"}>
                <span>
                    <span className={"font-bold max-sm:hidden"}>Никнейм: </span>
                    aav105
                </span>

                <span>
                    <span className={"font-bold max-sm:hidden"}>Корпоративная почта: </span>
                    <TextButton className={"font-normal text-dark/60"} onClick={() => window.open("mailto:1eshiy@tpu.ru")}>1eshiy@tpu.ru</TextButton>
                </span>
            </div>
        </div>
    )
}

export default ProfileInfo