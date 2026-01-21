import Card from "./wrappers/Card.tsx";
import InfoIcon from "../assets/images/info.svg?react"
import ErrorIcon from "../assets/images/error.svg?react"
import SuccessIcon from "../assets/images/accept.svg?react"
import {useCallback, useEffect} from "react";
import {twMerge} from "tailwind-merge";
import clsx from "clsx";
import {motion} from "framer-motion";

interface PopUpProps {
    id: number,
    children: React.ReactNode,
    status: keyof typeof IconVariants,
    onClose: (id: number) => void
}

const IconVariants = {
    "info": InfoIcon,
    "error": ErrorIcon,
    "success": SuccessIcon
} as const

const timelineColorVariants: { [K in keyof typeof IconVariants]: string } = {
    "info": "bg-blue",
    "error": "bg-error",
    "success": "bg-primary"
} as const

const IconColorVariants: { [K in keyof typeof IconVariants]: string } = {
    "info": "text-blue",
    "error": "text-error",
    "success": "text-primary"
} as const

const lifetime = 5000

function PopUp({children, status, onClose, id}: PopUpProps) {
    const Icon = IconVariants[status]
    const iconColor = IconColorVariants[status]
    const timelineColor = timelineColorVariants[status]

    const handleClose = useCallback(() => onClose(id), [id, onClose])

    useEffect(() => {
        const timeout = setTimeout(handleClose, lifetime)
        return () => clearTimeout(timeout)
    }, [handleClose])

    return (
        <Card
            className={"flex-center gap-2 lg:gap-3 relative select-none cursor-pointer max-w-[75vw] lg:max-w-[33vw]"}
            onClick={handleClose}
        >
            {children}
            <Icon className={twMerge(clsx("h-4 md:h-4.5 xl:h-5 shrink-0", iconColor))}/>
            <motion.span
                initial={{width: "90%"}}
                animate={{width: 0}}
                transition={{ease: "linear", duration: lifetime / 1000}}
                className={twMerge(clsx(
                    "absolute left-1/2 -translate-x-1/2 bottom-1.5 h-0.5 lg:h-1 rounded-full", timelineColor
                ))}
            />
        </Card>
    )
}

export default PopUp