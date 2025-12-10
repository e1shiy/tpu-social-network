import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import Button, {type ButtonProps} from "./Button.tsx";

interface ButtonMenuProps {
    buttons: ButtonProps[],
    className?: string,
}

function ButtonMenu({buttons, className} : ButtonMenuProps) {
    return (
        <ul className={twMerge(clsx(
            `p-2 md:p-2.5 flex flex-col gap-1.5 md:gap-2.5 bg-primary`,
            className
        ))}>
            {buttons.map((button, i) => <Button {...button} key={i}/>)}
        </ul>
    )
}

export default ButtonMenu