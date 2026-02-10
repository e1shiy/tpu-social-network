import avatarUrl from "../../assets/images/user-avatar.jpg"

import CameraIcon from "../../assets/images/camera.svg?react"
import TrashIcon from "../../assets/images/trash.svg?react"
import Button from "../buttons/Button.tsx";
import {ChangeEvent, RefObject, useRef, useState} from "react";
import {useClickOutside, useIsMyProfile} from "../../hooks";
import {useStore} from "../../store/store.ts";
import FileUploader from "../FileUploader.tsx";
import {IMAGE_TYPES} from "../../constants/media.ts";
import {validateAvatar, ValidateResponse} from "../../services/mediaValidateService.ts";
import {cn} from "../../utils/cn.ts";
import {isMobileDevice} from "../../utils/isMobileDevice.ts";
import ConfirmAction from "../ConfirmAction.tsx";

interface UserProfileAvatarProps {
    isOnline?: boolean,
    avatarUrl: string,
}

const baseStyles = "relative aspect-square rounded-full shrink-0 h-25 sm:h-30 md:h-35 lg:h-40 xl:h-45 2xl:h-50"
const ringStyles = "after:ring-dark/10 after:z-9 after:rounded-full after:ring-3 after:lg:ring-4 after:2xl:ring-5 after:ring-inset after:absolute after:inset-0"
const greenCircleStyles = "before:rounded-full before:z-11 before:block before:w-3 before:sm:w-3.5 before:md:w-4 before:lg:w-4.5 before:xl:w-5 before:border before:md:border-2 before:border-dark/25 before:aspect-square before:bg-primary-alt before:absolute before:inset-[85%] before:-translate-1/2"

function ProfileAvatar({}: UserProfileAvatarProps) {
    // todo get user info
    const [userAvatarUrl, setUserAvatarUrl] = useState(avatarUrl)
    const isOnline = true

    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const isMyProfile = useIsMyProfile()
    const {showPopUp} = useStore()

    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => setIsContextMenuOpen(false))

    const deleteAvatar = () => {
        // todo delete avatar
        showPopUp("Фото профиля удалено", "success")
        setIsContextMenuOpen(false)
        setIsConfirmOpen(false)
    }
    const handleUploaderClick = (inputRef: RefObject<HTMLInputElement | null>) => {
        if (!isMyProfile) return
        if (isMobileDevice()) {
            !isContextMenuOpen ? setIsContextMenuOpen(true) : inputRef.current?.click()
        } else {
            inputRef.current?.click()
        }
    }
    const handleUploaderChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const validate: ValidateResponse = await validateAvatar(file)
            if (validate.isValid) {
                setUserAvatarUrl(validate.data.previewUrl) // todo post avatar api
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
        <div className={"relative"} ref={ref}>
            <FileUploader
                accept={IMAGE_TYPES.join(", ")}
                onClick={handleUploaderClick}
                onChange={handleUploaderChange}
            >
                <div
                    onMouseEnter={() => setIsContextMenuOpen(true)}
                    onMouseLeave={() => setIsContextMenuOpen(false)}
                    className={cn(
                        baseStyles, ringStyles, isOnline && greenCircleStyles,
                        isMyProfile && isContextMenuOpen && "cursor-pointer before:blur-[1px] after:bg-dark/30"
                    )}
                >
                    <img className={cn(
                        "aspect-square h-full rounded-full object-cover",
                        isMyProfile && isContextMenuOpen && "blur-[1px]"
                    )} src={userAvatarUrl} alt="avatar"/>
                    {isMyProfile && <CameraIcon
                        className={cn(
                            "absolute z-11 w-3/7 inset-1/2 -translate-1/2 stroke-1 text-light opacity-0",
                            isContextMenuOpen && "opacity-100 group-active/wrapper:opacity-50"
                        )}
                    />}
                </div>
            </FileUploader>

            {
                isMyProfile && <Button
                    color={"error"}
                    className={cn(
                        "absolute z-11 w-max -translate-x-1/2 translate-y-full left-1/2 -bottom-2",
                        "invisible opacity-0", isContextMenuOpen && "visible opacity-100"
                    )}
                    TrailingIcon={TrashIcon}
                    onClick={() => setIsConfirmOpen(true)}
                    onMouseEnter={() => setIsContextMenuOpen(true)}
                    onMouseLeave={() => setIsContextMenuOpen(false)}
                >
                    <span>Удалить <span className={"max-lg:hidden"}>фото профиля</span></span>
                </Button>
            }

            <ConfirmAction
                text={"Удалить фото профиля?"}
                isOpen={isConfirmOpen}
                onConfirm={deleteAvatar}
                onReject={() => {
                    setIsConfirmOpen(false)
                    setIsContextMenuOpen(false)
                }}
            />
        </div>
    )
}

export default ProfileAvatar