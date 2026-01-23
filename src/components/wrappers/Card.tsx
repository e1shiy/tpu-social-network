import {twMerge} from "tailwind-merge";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}

function Card({children, className, ...props}: CardProps) {
    return (
        <div
            className={twMerge(clsx(
                `shadow bg-light rounded-2xl lg:rounded-[1.25rem] p-3.75 md:p-4.25 lg:p-5 xl:p-6.25`, className
            ))}
            {...props}
        >
            {children}
        </div>
    )
}

export default Card