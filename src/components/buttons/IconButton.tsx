import {cn} from "../../utils/cn.ts";

interface IconButtonProps {
    className?: string,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color?: keyof typeof colorSchemes;
    isActive?: boolean;
    onClick?: () => void;
}

const baseStyles = cn(
    "h-3.5 md:h-4 lg:h-5 2xl:h-6",
    "text-dark cursor-pointer active:opacity-60 focus:outline-none"
)

const colorSchemes = {
    "dark": (isActive: boolean) => isActive ? "text-dark" : "text-dark/60 hover:text-dark",
    "primary": (isActive: boolean) => isActive ? "text-primary" : "text-primary hover:text-primary-alt",
    "error": (isActive: boolean) => isActive ? "text-error" : "text-error hover:text-error-alt"
}

function IconButton({className, Icon, color="dark", isActive=false, onClick} : IconButtonProps) {
    const colorStyles = colorSchemes[color]

    return(
        <Icon
            className={cn(
                baseStyles,
                colorStyles(isActive),
                className
            )}
            onClick={onClick}
        />
    )
}

export default IconButton