import clsx from "clsx";
import {twMerge} from "tailwind-merge";

export interface ButtonProps {
    className?: string,
    children?: React.ReactNode;
    color?: keyof typeof colorSchemes;
    size?: keyof typeof sizeSchemes;
    isActive?: boolean;
    onClick?: () => void;
    TrailingIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    LeadingIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const buttonBaseStyles = "flex-center select-none cursor-pointer active:opacity-60 focus:outline-none"

const sizeSchemes = {
    "normal": twMerge(clsx(
        "h-[2.1875rem] sm:h-[2.3rem] md:h-[2.5rem] lg:h-[2.65rem] xl:h-[2.8rem] 2xl:h-[3rem]",
        "py-2.5 md:py-2.75 lg:py-3 xl:py-3.25 2xl:py-3.5",
        "px-2 sm:px-2.5 md:px-3 lg:px-3.5 xl:px-4 2xl:px-5",
        "gap-[0.3125rem] md:gap-[0.625rem] rounded-[0.3125rem] font-bold"
    )),
    "small": twMerge(clsx(
        "h-7 sm:h-7.25 md:h-8.25 lg:h-8.5 xl:h-9 2xl:h-9.75",
        // "h-7.25 sm:h-7.5 md:h-8 lg:h-8.5 xl:h-9 2xl:h-9.75",
        "py-1.75 md:py-2.5",
        "px-3 sm:px-4 md:px-5",
        "text-[0.6825rem] md:text-[0.75rem] lg:text-[0.825rem] xl:text-[0.9rem] 2xl:text-[0.95rem]",
        "gap-1.25 md:gap-1.75 rounded-[0.625rem] font-normal"
    ))
}

const colorSchemes = {
    "dark": (isActive: boolean) => `hover:shadow-dark/20 bg-light text-dark shadow ${isActive && "shadow-[0_0_20px_10px] shadow-dark/10"}`,
    "primary": (isActive: boolean) => `bg-primary text-light hover:bg-primary-alt ${isActive && "shadow-[0_0_10px_0] shadow-primary"}`,
    "error": (isActive: boolean) => `bg-danger text-light hover:bg-danger-alt ${isActive && "shadow-[0_0_10px_0] shadow-error"}`,
}

function Button({className, children, color = "primary", size = "normal", isActive=false, LeadingIcon, TrailingIcon, onClick}: ButtonProps) {
    const colorStyles = colorSchemes[color]
    const sizeStyles = sizeSchemes[size]
    return (
        <button
            type="button"
            className={twMerge(clsx(buttonBaseStyles, sizeStyles, colorStyles(isActive), className))}
            onClick={onClick}
        >
            {LeadingIcon && <LeadingIcon className={"h-full aspect-square text-current shrink-0"}/>}
            {children}
            {TrailingIcon && <TrailingIcon className={"h-full aspect-square text-current shrink-0"}/>}
        </button>
    );
}

export default Button;
