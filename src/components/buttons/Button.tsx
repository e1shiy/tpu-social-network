import clsx from "clsx";
import {twMerge} from "tailwind-merge";

export interface ButtonProps {
    className?: string,
    children?: React.ReactNode;
    color?: keyof typeof colorSchemes;
    isActive?: boolean;
    onClick?: () => void;
    TrailingIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
    LeadingIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const buttonBaseStyles = twMerge(clsx(
    "h-[2.1875rem] sm:h-[2.3rem] md:h-[2.5rem] lg:h-[2.65rem] xl:h-[2.8rem] 2xl:h-[3rem]",
    "p-[0.625rem] sm:p-[0.675rem] md:p-[0.725rem] lg:p-[0.775rem] xl:p-[0.825rem] 2xl:p-[0.875rem]",
    "flex-center gap-[0.3125rem] md:gap-[0.625rem]",
    "rounded-[0.3125rem] font-bold select-none cursor-pointer active:opacity-60 focus:outline-none"
))
const colorSchemes = {
    "primary": (isActive: boolean) => `${isActive ? "bg-primary shine shadow-primary" : "bg-primary"} text-light hover:bg-primary-alt`,
    "error": (isActive: boolean) => `${isActive ? "bg-danger shine shadow-error" : "bg-danger"} text-light hover:bg-danger-alt`,
}

function Button({className, children, color = "primary", isActive=false, LeadingIcon, TrailingIcon, onClick}: ButtonProps) {
    const colorStyles = colorSchemes[color]
    return (
        <button
            type="button"
            className={twMerge(clsx(buttonBaseStyles, colorStyles(isActive), className))}
            onClick={onClick}
        >
            {LeadingIcon && <LeadingIcon className={"h-full aspect-square text-current shrink-0"}/>}
            {children}
            {TrailingIcon && <TrailingIcon className={"h-full aspect-square text-current shrink-0"}/>}
        </button>
    );
}

export default Button;
