import CameraIcon from "../../assets/images/camera.svg?react"
import TrashIcon from "../../assets/images/trash.svg?react"
import Button from "../buttons/Button.tsx";
import {ChangeEvent, RefObject, useRef, useState} from "react";
import {useClickOutside, useIsMyProfile} from "../../hooks";
import Modal from "../Modal.tsx";
import Card from "../wrappers/Card.tsx";
import TextButton from "../buttons/TextButton.tsx";
import {useStore} from "../../store/store.ts";
import FileUploader from "../FileUploader.tsx";
import {IMAGE_TYPES} from "../../constants/services/mediaFiles.ts";
import {validateAvatar, ValidateResponse} from "../../services/mediaValidateService.ts";
import {cn} from "../../utils/cn.ts";

interface UserProfileAvatarProps {
    isOnline?: boolean,
    avatarUrl: string,
}

const baseStyles = "relative aspect-square rounded-full shrink-0 h-25 sm:h-30 md:h-35 lg:h-40 xl:h-45 2xl:h-50"
const ringStyles = "after:ring-dark/10 after:z-9 after:rounded-full after:ring-3 after:lg:ring-4 after:2xl:ring-5 after:ring-inset after:absolute after:inset-0"
const greenCircleStyles = "before:rounded-full before:z-11 before:block before:w-3 before:sm:w-3.5 before:md:w-4 before:lg:w-4.5 before:xl:w-5 before:border before:md:border-2 before:border-dark/25 before:aspect-square before:bg-primary-alt before:absolute before:inset-[85%] before:-translate-1/2"

function ProfileAvatar({isOnline = false, avatarUrl}: UserProfileAvatarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const isMyProfile = useIsMyProfile()
    const {showPopUp} = useStore()

    const ref = useRef<HTMLDivElement>(null)
    const callback = () => setIsContextMenuOpen(false)
    useClickOutside(ref, callback)

    const deleteAvatar = () => {
        // todo delete avatar
        showPopUp("Фото профиля удалено", "success")

        setIsContextMenuOpen(false)
        setIsModalOpen(false)
    }
    const handleUploaderClick = (inputRef: RefObject<HTMLInputElement | null>) => {
        if (!isMyProfile) return
        if (window.matchMedia("(pointer: coarse)").matches) {
            if (!isContextMenuOpen) setIsContextMenuOpen(true)
            else {
                inputRef.current?.click()
            }
        } else {
            inputRef.current?.click()
        }
    }
    const handleUploaderChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const validate: ValidateResponse = await validateAvatar(file)
            if (validate.isValid) {
                const avatarMediaFile = validate.data // todo upload avatar
                showPopUp("Новое фото профиля загружено", "success")
            } else {
                const errors = validate.errors
                errors.forEach(message => showPopUp(message, "error"))
            }
        }
        e.target.value = ""
        setIsContextMenuOpen(false)
    }

    return (
        <div className={"group relative"} ref={ref}>
            <FileUploader
                accept={IMAGE_TYPES.join(", ")}
                onClick={handleUploaderClick}
                onChange={handleUploaderChange}
            >
                <div
                    className={cn(
                        baseStyles, ringStyles, isOnline && greenCircleStyles, "group/wrapper",
                        isMyProfile && "hover:cursor-pointer hover:before:blur-[1px] group-hover:after:bg-dark/30",
                        isMyProfile && isContextMenuOpen && "before:blur-[1px] after:bg-dark/30"
                    )}
                >
                    <img className={cn(
                        "aspect-square h-full rounded-full",
                        isMyProfile && "group-hover:blur-[1px]",
                        isMyProfile && isContextMenuOpen && "blur-[1px]"
                    )} src={avatarUrl} alt="avatar"/>
                    {isMyProfile && <CameraIcon
                        className={cn(
                            "absolute z-11 w-3/7 inset-1/2 -translate-1/2 stroke-1 text-light",
                            isContextMenuOpen ?
                                "opacity-100 group-active/wrapper:opacity-50" :
                                "opacity-0 group-hover:opacity-100 group-hover:group-active/wrapper:opacity-50"
                        )}
                    />}
                </div>
            </FileUploader>

            {
                isMyProfile && <Button
                    color={"error"}
                    className={cn(
                        "absolute w-max -translate-x-1/2 translate-y-full left-1/2 -bottom-2",
                        "invisible opacity-0 group-hover:visible group-hover:opacity-100",
                        isContextMenuOpen && "visible opacity-100"
                    )}
                    TrailingIcon={TrashIcon}
                    onClick={() => setIsModalOpen(true)}
                >
                    <span>Удалить <span className={"max-lg:hidden"}>фото профиля</span></span>
                </Button>
            }

            <Modal isOpened={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Card className={"flex-center flex-col gap-4 text-center"}>
                    <div>
                        <h4>Удалить фото профиля?</h4>
                        <p className={"text-dark/60"}>Это действие нельзя будет отменить</p>
                    </div>
                    <div className={"flex w-full justify-between items-center gap-3 md:gap-3.5 xl:gap-4"}>
                        <TextButton className={"grow"} color={"primary"} onClick={deleteAvatar}>Удалить</TextButton>
                        <TextButton className={"grow"} color={"error"} onClick={() => {
                            setIsModalOpen(false)
                            setIsContextMenuOpen(false)
                        }}>Отмена</TextButton>
                    </div>
                </Card>
            </Modal>
        </div>
    )
}

export default ProfileAvatar