import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import ChevronRight from "../../assets/images/chevron-right.svg?react"
import * as React from "react";

const userMenuBaseStyles = `
    h-[2.1875rem] sm:h-[2.3rem] md:h-[2.5rem] lg:h-[2.65rem] xl:h-[2.8rem] 2xl:h-[3rem] 
    px-[0.625rem] sm:px-[0.675rem] md:px-[0.725rem] lg:px-[0.775rem] xl:px-[0.825rem] 2xl:px-[0.875rem]
    py-[0.3125rem] sm:py-[0.32rem] md:py-[0.33rem] lg:py-[0.345rem] xl:py-[0.36rem] 2xl:py-[0.375rem]
    flex-center gap-[0.3125rem] md:gap-[0.625rem]
    rounded-[0.3125rem] text-light font-bold cursor-pointer active:opacity-60 focus:outline-none
    bg-primary hover:bg-primary-alt relative
`

const chevronRightBaseStyles = `h-4 sm:h-4.5 md:h-5 lg:h-5.3 xl:h-5.6 2xl:h-6 aspect-square text-current transition-transform`

interface UserDropdownButtonProps {
    className?: string,
    children?: React.ReactNode,
    avatarUrl?: string,
    isActive: boolean,
    onClick?: () => void
}

function UserDropdownButton({className, children, avatarUrl, isActive, onClick} : UserDropdownButtonProps) {
    return (
        <button onClick={onClick} className={twMerge(clsx(userMenuBaseStyles, className))}>
            <img src={avatarUrl} className="aspect-square h-full rounded-full"  alt="avatar"/>
            {children}
            <ChevronRight className={twMerge(
                clsx(chevronRightBaseStyles, isActive && "rotate-90")
            )} />
        </button>
    )
}

export default UserDropdownButton