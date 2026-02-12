import {ComponentPropsWithoutRef, useEffect, useRef} from "react";
import {cn} from "../utils/cn.ts";

interface TextareaProps extends ComponentPropsWithoutRef<"textarea"> {
    focusOnEnable?: boolean
}

function Textarea({focusOnEnable=false, className, disabled, ...props} : TextareaProps) {
    const ref = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (!focusOnEnable || !ref.current) return

        const textarea = ref.current
        if (!textarea.disabled) {
            const length = textarea.value.length;
            textarea.focus()
            textarea.setSelectionRange(length, length);
        }
    }, [disabled])

    return (
        <textarea
            ref={ref}
            className={cn("field-sizing-content resize-none outline-none", className)}
            disabled={disabled}
            {...props}
        />
    )
}

export default Textarea