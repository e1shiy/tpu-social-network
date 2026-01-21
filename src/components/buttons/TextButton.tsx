import {twMerge} from "tailwind-merge";
import clsx from "clsx";

interface TextButtonProps {
    children?: React.ReactNode,
    className?: string,
    onClick?: () => void,
    isActive?: boolean,
    color?: keyof typeof colorSchemes
}

const colorSchemes = {
    "default": (isActive: boolean) => `text-dark hover:text-primary ${isActive && "text-primary"}`,
    "primary": (isActive: boolean) => `text-primary hover:text-primary-alt ${isActive && "text-primary-alt"}`,
    "error": (isActive: boolean) => `text-error hover:text-error-alt ${isActive && "text-error-alt"}`,
}

function TextButton({children, className, onClick, color="default", isActive=false} : TextButtonProps) {
    const colorStyles = colorSchemes[color]
    return(
        <button className={twMerge(clsx(
            `font-bold cursor-pointer active:opacity-60`,
            colorStyles(isActive),
            className
        ))} onClick={onClick}>
            {children}
        </button>
    )
}

export default TextButton