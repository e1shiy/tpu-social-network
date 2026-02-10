import {cn} from "../../utils/cn.ts";

interface TextButtonProps {
    children?: React.ReactNode,
    className?: string,
    onClick?: () => void,
    isActive?: boolean,
    color?: keyof typeof colorSchemes
}

const colorSchemes = {
    "dark": (isActive: boolean) => `text-dark hover:text-primary ${isActive && "text-primary"}`,
    "primary": (isActive: boolean) => `text-primary hover:text-primary-alt ${isActive && "text-primary-alt"}`,
    "danger": (isActive: boolean) => `text-danger hover:text-danger-alt ${isActive && "text-danger-alt"}`,
}

function TextButton({children, className, onClick, color="dark", isActive=false} : TextButtonProps) {
    const colorStyles = colorSchemes[color]
    return(
        <button className={cn(
            `font-bold cursor-pointer active:opacity-60`,
            colorStyles(isActive),
            className
        )} onClick={onClick}>
            {children}
        </button>
    )
}

export default TextButton