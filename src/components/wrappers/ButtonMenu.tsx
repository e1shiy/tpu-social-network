import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import Button, {type ButtonProps} from "../buttons/Button.tsx";
import type {Ref} from "react";

interface ButtonMenuProps {
    buttons: ButtonProps[],
    className?: string,
    ref?: Ref<HTMLUListElement>,
}

function ButtonMenu({buttons, className, ref} : ButtonMenuProps) {
    return (
        <ul ref={ref} className={twMerge(clsx(
            `p-2 md:p-2.5 flex flex-col gap-1.5 md:gap-2.5 bg-primary shadow-base`,
            className
        ))}>
            {buttons.map((button, i) => <Button {...button} key={i}/>)}
        </ul>
    )
}

export default ButtonMenu