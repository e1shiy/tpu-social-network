import {cn} from "../../utils/cn.ts";
import {ComponentPropsWithoutRef} from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    color?: keyof typeof buttonColorSchemes;
    size?: keyof typeof sizeSchemes;
    fill?: boolean
    isActive?: boolean;
    TrailingIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    LeadingIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const buttonBaseStyles = "flex-center select-none cursor-pointer active:opacity-60 focus:outline-none"

const sizeSchemes = {
    "normal": cn(
        "h-[2.1875rem] sm:h-[2.3rem] md:h-[2.5rem] lg:h-[2.65rem] xl:h-[2.8rem] 2xl:h-[3rem]",
        "py-2.5 md:py-2.75 lg:py-3 xl:py-3.25 2xl:py-3.5",
        "px-2 sm:px-2.5 md:px-3 lg:px-3.5 xl:px-4 2xl:px-5",
        "gap-[0.3125rem] md:gap-[0.625rem] rounded-[0.3125rem] font-bold"
    ),
    "small": cn(
        "h-7 sm:h-7.25 md:h-8.25 lg:h-8.5 xl:h-9 2xl:h-9.75",
        "py-1.75 md:py-2.5",
        "px-3 sm:px-4 md:px-5",
        "text-[0.6825rem] md:text-[0.75rem] lg:text-[0.825rem] xl:text-[0.9rem] 2xl:text-[0.95rem]",
        "gap-1.25 md:gap-1.75 rounded-[0.625rem] font-normal"
    )
}

const buttonColorSchemes = {
    "dark": (isActive: boolean) => `hover:shadow-dark/20 bg-light text-dark shadow ${isActive && "shadow-[0_0_20px_10px] shadow-dark/10"}`,
    "primary": (isActive: boolean) => `bg-primary text-light hover:bg-primary-alt ${isActive && "shadow-[0_0_10px_0] shadow-primary"}`,
    "danger": (isActive: boolean) => `bg-danger text-light hover:bg-danger-alt ${isActive && "shadow-[0_0_10px_0] shadow-danger"}`,
}

const iconColorSchemes = {
    "dark": (isActive: boolean) => cn(isActive ? "fill-dark" : "fill-light"),
    "primary": (isActive: boolean) => cn(isActive ? "fill-primary" : "fill-light"),
    "danger": (isActive: boolean) => cn(isActive ? "fill-danger" : "fill-light")
}

function Button({className, children, color = "primary", size = "normal", fill=false, isActive=false, LeadingIcon, TrailingIcon, ...props}: ButtonProps) {
    const buttonColorStyles = buttonColorSchemes[color]
    const iconColorStyles = iconColorSchemes[color]
    const sizeStyles = sizeSchemes[size]
    return (
        <button
            type="button"
            className={cn(buttonBaseStyles, sizeStyles, buttonColorStyles(isActive), className)}
            {...props}
        >
            {LeadingIcon && <LeadingIcon className={cn("h-full aspect-square text-current shrink-0", fill && iconColorStyles(isActive))}/>}
            {children}
            {TrailingIcon && <TrailingIcon className={cn("h-full aspect-square text-current shrink-0", fill && iconColorStyles(isActive))}/>}
        </button>
    );
}

export default Button;
