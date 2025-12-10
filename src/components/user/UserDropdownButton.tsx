import clsx from "clsx"
import {twMerge} from "tailwind-merge"
import ChevronRight from "../../assets/images/chevron-right.svg?react"
import * as React from "react";
import Button from "../Button.tsx";

interface UserDropdownButtonProps {
    className?: string,
    children?: React.ReactNode,
    avatarUrl?: string,
    isActive: boolean,
    onClick?: () => void
}

function UserDropdownButton({className, children, avatarUrl, isActive, onClick}: UserDropdownButtonProps) {
    return (
        <Button
            onClick={onClick}
            className={twMerge(clsx(
                `py-[0.3125rem] sm:py-[0.32rem] md:py-[0.33rem] lg:py-[0.345rem] xl:py-[0.36rem] 2xl:py-[0.375rem] relative`,
                className
            ))}
        >
            <img src={avatarUrl} className="aspect-square h-full rounded-full shrink-0" alt="avatar"/>
            {children}
            <ChevronRight className={twMerge(clsx(
                `h-4 sm:h-4.5 md:h-5 lg:h-5.3 xl:h-5.6 2xl:h-6 aspect-square text-current transition-transform shrink-0`,
                isActive && "rotate-90"
            ))}/>
        </Button>

    )
}

export default UserDropdownButton