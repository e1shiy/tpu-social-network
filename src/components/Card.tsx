import {twMerge} from "tailwind-merge";
import clsx from "clsx";

interface CardProps {
    children?: React.ReactNode,
    className?: string
}

function Card({children, className}: CardProps) {
    return (
        <div className={twMerge(clsx(
            `shadow-base bg-light rounded-2xl lg:rounded-[1.25rem] p-3.75 md:p-4.25 lg:p-5`,
            className
        ))}>
            {children}
        </div>
    )
}

export default Card