import DeleteCircleIcon from "../../../assets/images/x-circle.svg?react"
import ScaleCircleIcon from "../../../assets/images/zoom-in.svg?react"
import {useRef, useState} from "react";
import {cn} from "../../../utils/cn.ts";
import {useClickOutside} from "../../../hooks";
import {ImageFile} from "../../../types/entities";
import {AttachmentSize} from "./PostAttachment.tsx";

const sizeSchemes: { [K in AttachmentSize]: string } = {
    "normal": "h-25 sm:h-30 md:h-35 lg:h-40 xl:h-45 2xl:h-50 rounded-[0.625rem] md:rounded-[1rem] xl:rounded-[1.25rem]",
    "small": "h-13 sm:h-15 md:h-18 lg:h-20 xl:h-22.5 2xl:h-25 rounded-[0.625rem]"
}

const actionStyles = (isContextMenuOpen: boolean, isVisible: boolean) => cn(
    "abs-center aspect-square w-2/5 z-2 stroke-1",
    "text-light cursor-pointer hover:text-light/80 active:text-light/60",
    "opacity-0 pointer-events-none",
    isVisible && "group-hover:opacity-100 group-hover:pointer-events-auto",
    isVisible && isContextMenuOpen && "opacity-100 pointer-events-auto"
)

interface ImageAttachmentProps {
    file: ImageFile,
    isEditing?: boolean,
    onDelete?: () => void,
    isExpanded?: boolean
    onExpand?: () => void,
    size?: AttachmentSize
}

function ImageAttachment({...props}: ImageAttachmentProps) {
    const {file: {previewUrl}, isEditing = false, onDelete, isExpanded = false, onExpand, size = "normal"} = props
    const sizeStyles = sizeSchemes[size]

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const callback = () => setIsContextMenuOpen(false)
    useClickOutside(ref, callback)

    return isExpanded ? (
        <div className={"relative w-fit h-full flex-center"}>
            <img
                src={previewUrl}
                alt="post image"
                className={"block w-[92vw] lg:w-[52vw] max-h-[70dvh] lg:max-h-[83dvh] max-w-full h-auto object-contain"}
            />
        </div>
    ) : (
        <div
            ref={ref}
            className={cn(
                sizeStyles,
                "overflow-hidden select-none shrink-0 aspect-square",
                "relative after:inset-0 after:bg-dark/15 after:aspect-square after:h-full after:absolute",
                "group hover:after:bg-dark/50", isContextMenuOpen && "after:bg-dark/50",
                !isEditing && "cursor-pointer"
            )}
            onClick={() => {
                if (isEditing) {
                    window.matchMedia("(pointer: coarse)").matches && setIsContextMenuOpen(true)
                } else {
                    onExpand?.()
                }
            }}
        >
            <img
                src={previewUrl}
                alt="post image"
                className={"h-full aspect-square object-cover"}
            />

            <DeleteCircleIcon
                className={actionStyles(isContextMenuOpen, isEditing)}
                onClick={onDelete}
            />
            <ScaleCircleIcon
                className={cn(
                    actionStyles(isContextMenuOpen, !isEditing),
                    "group-hover:text-light/80 group-active:text-light/60"
                )}
            />
        </div>
    )
}

export default ImageAttachment