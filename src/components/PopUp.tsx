import Card from "./wrappers/Card.tsx";
import InfoIcon from "../assets/images/info.svg?react"
import ErrorIcon from "../assets/images/error.svg?react"
import SuccessIcon from "../assets/images/accept.svg?react"
import {useCallback, useEffect, useRef, useState} from "react";
import {motion, useAnimation} from "framer-motion";
import {cn} from "../utils/cn.ts";

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

function PopUp({children, status, onClose, id}: PopUpProps) {
    const Icon = IconVariants[status]
    const iconColor = IconColorVariants[status]
    const timelineColor = timelineColorVariants[status]

    const [isPaused, setIsPaused] = useState(false)
    const animation = useAnimation()

    const handleClose = useCallback(() => onClose(id), [id, onClose])
    const lifetime = useRef<number>(5000)

    useEffect(() => {
        if (isPaused) {
            animation.stop()
            return
        }
        animation.start({
            width: 0,
            transition: {
                duration: lifetime.current / 1000,
                ease: "linear"
            }
        })
        const startTime = Date.now()
        const timeout = setTimeout(handleClose, lifetime.current)
        return () => {
            clearTimeout(timeout)
            lifetime.current -= Date.now() - startTime
        }
    }, [handleClose, isPaused])

    return (
        <Card
            className={"flex-center gap-2 lg:gap-3 relative select-none cursor-pointer max-w-[75vw] lg:max-w-[33vw]"}
            onClick={handleClose}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {children}
            <Icon className={cn("h-4 md:h-4.5 xl:h-5 shrink-0", iconColor)}/>
            <motion.span
                initial={{width: "90%"}}
                animate={animation}
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 bottom-1.5 h-0.5 lg:h-1 rounded-full",
                    timelineColor
                )}
            />
        </Card>
    )
}

export default PopUp