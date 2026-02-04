import DocumentIcon from "../../assets/images/document.svg?react"
import DeleteCircleIcon from "../../assets/images/x-circle.svg?react"
import ScaleCircleIcon from "../../assets/images/zoom-in.svg?react"

import {useRef, useState} from "react";
import {useClickOutside} from "../../hooks";
import {cn} from "../../utils/cn.ts";
import {isMobileDevice} from "../../utils/isMobileDevice.ts";
import {MediaFile} from "../../types/entities";
import {formatBytesToMB, formatSecondsToMMSS} from "../../utils/format.ts";

export const overlayStyles = (isOverlayOpen: boolean) => cn(
    "abs-center aspect-square w-2/5 z-2 stroke-1",
    "text-light cursor-pointer hover:text-light/80 active:text-light/60",
    "opacity-0 pointer-events-none",
    isOverlayOpen && "opacity-100 pointer-events-auto"
)

const sizeSchemes: { [K in AttachmentSize]: string } = {
    "normal": "h-25 sm:h-30 md:h-35 lg:h-40 xl:h-45 2xl:h-50 rounded-[0.625rem] md:rounded-[1rem] xl:rounded-[1.25rem]",
    "small": "h-15 sm:h-17 md:h-20 lg:h-21 xl:h-22.5 2xl:h-25 rounded-[0.625rem]"
}

export type AttachmentSize = "small" | "normal"

interface AttachmentProps {
    file: MediaFile,
    context: {
        isEditing?: boolean,
        onDelete?: () => void,
        isExpanded?: boolean,
        onExpand?: () => void,
    }
    size?: AttachmentSize
}

function Attachment({file, context, size = "normal"}: AttachmentProps) {
    const {isEditing = false, onDelete, isExpanded = false, onExpand} = context
    const {type, name, previewUrl, sourceUrl} = file

    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const attachmentRef = useRef<HTMLDivElement>(null)
    useClickOutside(attachmentRef, () => setIsOverlayOpen(false))

    let expandedAttachment: React.ReactNode | undefined = undefined
    let normalAttachment: React.ReactNode | undefined = undefined
    const extension = name.substring(name.lastIndexOf(".") + 1).toUpperCase()
    switch (type) {
        case "image":
            expandedAttachment = <img
                src={sourceUrl}
                alt="post image"
                className={"block w-[92vw] lg:w-[52vw] max-h-[70dvh] lg:max-h-[83dvh] max-w-full h-auto object-contain"}
            />
            normalAttachment = <img
                src={previewUrl}
                alt="post image"
                className={"h-full aspect-square object-cover"}
            />
            break
        case "video":
            expandedAttachment = <video
                controls
                autoPlay
                src={sourceUrl}
                className={"block w-[92vw] lg:w-[52vw] max-h-[70dvh] lg:max-h-[83dvh] max-w-full h-auto object-contain"}
            />
            normalAttachment = <video
                src={previewUrl}
                className={"h-full aspect-square object-cover"}
            />
            break
        case "document":
            normalAttachment = (
                <div className={"flex-center flex-col p-1 lg:p-1.5 gap-0.5 lg:gap-1 h-full"}>
                    <a
                        href={file.sourceUrl} download
                        className={cn(
                            "relative h-full cursor-pointer",
                            isOverlayOpen && !isEditing && "scale-99 active:scale-96 duration-100"
                        )}
                    >
                        <DocumentIcon className={"h-full"}/>
                        <span className={"absolute left-1/2 top-2/3 -translate-1/2 text-light"}>
                            {size === "normal" ? (
                                <h2>{extension}</h2>
                            ) : (
                                <p className={"text-[0.6325rem] md:text-[0.7rem] lg:text-[0.795rem] xl:text-[0.87rem] 2xl:text-[0.92rem]"}>
                                    {extension.slice(0, 3)}
                                </p>
                            )}
                        </span>
                    </a>
                    {/* todo name of the file (tooltip?) */}
                    <p className={cn(
                        "text-dark/60",
                        size === "small" && "text-[0.6325rem] md:text-[0.7rem] lg:text-[0.795rem] xl:text-[0.87rem] 2xl:text-[0.92rem]"
                    )}>
                        {formatBytesToMB(file.size)} МБ {/* todo better formatting */}
                    </p>
                </div>
            )
            break
        case "audio":
            normalAttachment = (
                <div className={"flex-center flex-col p-1 lg:p-1.5 gap-0.5 lg:gap-1 h-full"}>
                    <a
                        href={file.sourceUrl} download
                        className={cn(
                            "relative h-full cursor-pointer",
                            isOverlayOpen && !isEditing && "scale-99 active:scale-97 duration-150"
                        )}
                    >
                        <DocumentIcon className={"h-full"}/>
                        <span className={"absolute left-1/2 top-2/3 -translate-1/2 text-light"}>
                            {size === "normal" ? (
                                <h2>{extension}</h2>
                            ) : (
                                <p className={"text-[0.6325rem] md:text-[0.7rem] lg:text-[0.795rem] xl:text-[0.87rem] 2xl:text-[0.92rem]"}>
                                    {extension.slice(0, 3)}
                                </p>
                            )}
                        </span>
                    </a>
                    {/* todo name of the file (tooltip?) */}
                    <p className={cn(
                        "text-dark/60",
                        size === "small" && "text-[0.6325rem] md:text-[0.7rem] lg:text-[0.795rem] xl:text-[0.87rem] 2xl:text-[0.92rem]"
                    )}>
                        {formatSecondsToMMSS(file.duration)} {/* todo better formatting */}
                    </p>
                </div> /* todo audio */
            )
            break
    }

    return isExpanded ? (
        <div className={"relative w-fit h-full flex-center"}>
            {expandedAttachment}
        </div>
    ) : (
        <div
            onMouseEnter={() => setIsOverlayOpen(true)}
            onMouseLeave={() => setIsOverlayOpen(false)}
            onClick={() => isMobileDevice() && setIsOverlayOpen(true)}
            className={cn(
                "overflow-hidden select-none shrink-0 aspect-square shadow",
                "relative after:inset-0 after:aspect-square after:h-full after:absolute",
                isOverlayOpen && (expandedAttachment || isEditing) && "after:bg-dark/50",
                !expandedAttachment && !isEditing && "after:pointer-events-none",
                sizeSchemes[size]
            )}
        >
            {normalAttachment}
            {isEditing ?
                <DeleteCircleIcon className={overlayStyles(isOverlayOpen)} onClick={onDelete}/> :
                expandedAttachment && <ScaleCircleIcon className={overlayStyles(isOverlayOpen)} onClick={onExpand}/>
            }
        </div>
    )
}

export default Attachment