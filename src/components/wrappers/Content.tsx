import {twMerge} from "tailwind-merge";
import clsx from "clsx";

interface ContentProps {
    className?: string,
    children?: React.ReactNode
}

function Content({className, children}: ContentProps) {
    return(
        <div className={twMerge(clsx(
            "grow overflow-y-auto",
            className
        ))}>
            {children}
        </div>
    )
}

export default Content