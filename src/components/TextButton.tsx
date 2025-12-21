import {twMerge} from "tailwind-merge";
import clsx from "clsx";

interface TextButtonProps {
    children?: React.ReactNode,
    className?: string,
    onClick?: () => void,
    isActive?: boolean,
}

function TextButton({children, className, onClick, isActive=false} : TextButtonProps) {
    return(
        <button className={twMerge(clsx(
            `font-bold cursor-pointer ${isActive ? "text-primary" : ""} hover:text-primary`,
            className
        ))} onClick={onClick}>
            {children}
        </button>
    )
}

export default TextButton