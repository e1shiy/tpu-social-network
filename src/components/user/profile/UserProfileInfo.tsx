import TextCard from "../../TextCard.tsx";
import TextButton from "../../TextButton.tsx";
import {useStore} from "../../../store/store.ts";
import type {Ref} from "react";

interface UserProfileInfoProps {
    id: string,
    ref?: Ref<HTMLDivElement>;
    className?: string
}

function UserProfileInfo({id, className, ref}: UserProfileInfoProps) {
    const {userId} = useStore()
    const isReadonly = userId !== id
    // todo user info
    const userAbout = "23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble"
    const userLifePosition = "23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu blu blu ble ble ble23 y.o. designer from San Francisco bla bla bla blu"

    return (
        <div className={className} ref={ref}>
            <div className={"flex max-md:flex-col gap-4 md:gap-5"}>
                <TextCard
                    className={"w-full"}
                    isReadonly={isReadonly}
                    title={"О себе"}
                    text={userAbout}
                    // todo update user abouts
                />
                <TextCard
                    className={"w-full"}
                    isReadonly={isReadonly}
                    title={"Жизненная позиция"}
                    text={userLifePosition}
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
                    <TextButton className={"font-normal"} onClick={() => window.open("mailto:1eshiy@tpu.ru")}>1eshiy@tpu.ru</TextButton>
                </span>
            </div>
        </div>
    )
}

export default UserProfileInfo