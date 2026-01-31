import {ComponentPropsWithoutRef} from "react";
import {cn} from "../utils/cn.ts";

interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {}

function Textarea({className, ...props} : TextareaProps) {
    return (
        <textarea
            className={cn("field-sizing-content resize-none outline-none", className)}
            {...props}
        />
    )
}

export default Textarea