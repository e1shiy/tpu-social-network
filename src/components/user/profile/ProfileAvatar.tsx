import {twMerge} from "tailwind-merge";
import clsx from "clsx";
import CameraIcon from "../../../assets/images/camera.svg?react"
import TrashIcon from "../../../assets/images/trash.svg?react"
import Button from "../../buttons/Button.tsx";
import {useRef, useState} from "react";
import {useClickOutside, useIsMyProfile} from "../../../hooks";
import Modal from "../../Modal.tsx";
import Card from "../../wrappers/Card.tsx";
import TextButton from "../../buttons/TextButton.tsx";
import {useStore} from "../../../store/store.ts";

interface UserProfileAvatarProps {
    isOnline?: boolean,
    avatarUrl: string,
}

const baseStyles = "group relative aspect-square rounded-full shrink-0 h-25 sm:h-30 md:h-35 lg:h-40 xl:h-45 2xl:h-50"
const ringStyles = "after:ring-dark/10 after:z-9 after:rounded-full after:ring-3 after:lg:ring-4 after:2xl:ring-5 after:ring-inset after:absolute after:inset-0"
const greenCircleStyles = "before:rounded-full before:z-11 before:block before:w-3 before:sm:w-3.5 before:md:w-4 before:lg:w-4.5 before:xl:w-5 before:border before:md:border-2 before:border-dark/25 before:aspect-square before:bg-primary-alt before:absolute before:inset-[85%] before:-translate-1/2"

function ProfileAvatar({isOnline = false, avatarUrl}: UserProfileAvatarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const isMyProfile = useIsMyProfile()
    const { showPopUp } = useStore()

    const clickHandler = () => {
        if (!isMyProfile) return

        if (window.matchMedia("(pointer: coarse)").matches) {
            if (!isContextMenuOpen) setIsContextMenuOpen(true)
            else {
                // todo choose photo
            }
        } else {
            // todo choose photo
        }
    }

    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => setIsContextMenuOpen(false))

    const deleteAvatar = () => {
        // todo delete avatar
        if (Math.random() > 0.5) showPopUp("Фото профиля удалено", "success")
        else showPopUp("Ошибка при удалении фото профиля", "error")

        setIsContextMenuOpen(false)
        setIsModalOpen(false)
    }

    return (
        <div
            className={twMerge(clsx(
                baseStyles, ringStyles, isOnline && greenCircleStyles,
                isMyProfile && "hover:cursor-pointer hover:before:blur-[1px]",
                isMyProfile && isContextMenuOpen && "before:blur-[1px]"
            ))}
            onClick={clickHandler}
            ref={ref}
        >
            <div className={twMerge(clsx(
                "group/wrapper rounded-full",
                "after:absolute after:rounded-full after:aspect-square after:w-full after:inset-0 after:z-10",
                isMyProfile && "group-hover:after:bg-dark/30",
                isMyProfile && isContextMenuOpen && "after:bg-dark/30"
            ))}>
                <img className={twMerge(clsx(
                    "aspect-square h-full rounded-full",
                    isMyProfile && "group-hover:blur-[1px]",
                    isMyProfile && isContextMenuOpen && "blur-[1px]"
                ))} src={avatarUrl} alt="avatar"/>
                {isMyProfile && <CameraIcon
                    className={twMerge(clsx(
                        "absolute z-11 w-3/7 inset-1/2 -translate-1/2 stroke-1 text-light",
                        isContextMenuOpen ?
                            "opacity-100 group-active/wrapper:opacity-50" :
                            "opacity-0 group-hover:opacity-100 group-hover:group-active/wrapper:opacity-50"
                    ))} // todo на мобилках при открытии анимация отстает (opacity 0 -> 100 и 50 -> 100 (?) одновременно)
                />}
            </div>

            {isMyProfile && <Button
                color={"error"}
                className={twMerge(clsx(
                    "absolute w-max -translate-x-1/2 translate-y-full left-1/2 -bottom-2",
                    "invisible opacity-0 group-hover:visible group-hover:opacity-100",
                    isContextMenuOpen && "visible opacity-100"
                ))}
                TrailingIcon={TrashIcon}
                onClick={() => setIsModalOpen(true)}
            >
                <span>Удалить <span className={"max-lg:hidden"}>фото профиля</span></span>
            </Button>
            }

            {isModalOpen &&
                <Modal onClose={() => setIsModalOpen(false)}>
                    <Card className={"flex-center flex-col gap-4 text-center"}>
                        <div>
                            <h4>Удалить фото профиля?</h4>
                            <p className={"text-dark/60"}>Это действие нельзя будет отменить</p>
                        </div>
                        <div className={"flex w-full justify-between items-center gap-3 md:gap-3.5 xl:gap-4"}>
                            <TextButton className={"grow"} color={"primary"} onClick={deleteAvatar}>Удалить</TextButton>
                            <TextButton className={"grow "} color={"error"} onClick={() => {
                                setIsModalOpen(false)
                                setIsContextMenuOpen(false)
                            }}>Отмена</TextButton>
                        </div>
                    </Card>
                </Modal>
            }
        </div>
    )
}

export default ProfileAvatar