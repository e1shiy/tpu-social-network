import Button, {type ButtonProps} from "../buttons/Button.tsx";
import type {Ref} from "react";
import {cn} from "../../utils/cn.ts";

interface ButtonMenuProps {
    buttons: ButtonProps[],
    className?: string,
    ref?: Ref<HTMLUListElement>,
}

function ButtonMenu({buttons, className, ref} : ButtonMenuProps) {
    return (
        <ul ref={ref} className={cn(
            "p-2 md:p-2.5 flex flex-col gap-1.5 md:gap-2.5 bg-primary shadow",
            className
        )}>
            {buttons.map((button, i) => <Button {...button} key={i}/>)}
        </ul>
    )
}

export default ButtonMenu