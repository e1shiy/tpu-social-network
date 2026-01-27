import {cn} from "../../utils/cn.ts";
import Fade from "../wrappers/animations/Fade.tsx";
import {useRef, useState} from "react";
import {useClickOutside} from "../../hooks";
import CloseCircleIcon from "../../assets/images/x-circle.svg?react"

export interface PostAttachment {
    id: string,
    file: File,
    previewSrc: string
}

interface PostCreatorAttachmentProps extends Pick<PostAttachment, "file" | "previewSrc"> {
    onClose: () => void;
}

function PostCreatorAttachment({file, previewSrc, onClose} : PostCreatorAttachmentProps) {
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)

    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => setIsContextMenuOpen(false))

    return(
        <Fade
            ref={ref}
            layout
            className={cn(
                "aspect-square h-13 sm:h-15 md:h-18 lg:h-20 xl:h-22.5 2xl:h-25 rounded-[0.625rem] overflow-hidden select-none shrink-0",
                "relative after:inset-0 after:bg-dark/15 after:aspect-square after:h-full after:absolute",
                "group hover:after:bg-dark/50", isContextMenuOpen && "after:bg-dark/50"
            )}
            onClick={() => {
                if (window.matchMedia("(pointer: coarse)").matches && !isContextMenuOpen) {
                    setIsContextMenuOpen(true)
                }
            }}
        >
            <img
                src={previewSrc}
                alt={file.name}
                className={"w-full h-full object-cover"}
            />
            <CloseCircleIcon
                className={cn(
                    "abs-center aspect-square w-7.5 md:w-8 xl:w-10 z-2 stroke-1",
                    "text-light hover:text-light/80 hover:cursor-pointer active:text-light/60",
                    "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto",
                    isContextMenuOpen && "opacity-100 pointer-events-auto"
                )}
                onClick={() => {
                    if (window.matchMedia("(pointer: coarse)").matches ) {
                        isContextMenuOpen && onClose()
                    } else {
                        onClose()
                    }
                }}
            />
        </Fade>
    )
}

export default PostCreatorAttachment