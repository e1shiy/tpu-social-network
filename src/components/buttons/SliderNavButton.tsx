import ChevronRight from "../../assets/images/chevron-right.svg?react"
import {ComponentPropsWithoutRef} from "react";
import {cn} from "../../utils/cn.ts";

interface SliderNavButton extends ComponentPropsWithoutRef<"button"> {
    direction?: "left" | "right"
}

function SliderNavButton({direction="right", className, ...props}: SliderNavButton) {
    return (
        <button
            className={cn(
                "h-full absolute inset-y-0 w-10 sm:w-12 md:w-15 bg-dark opacity-15",
                "cursor-pointer hover:opacity-50 active:opacity-60",
                direction === "left" ? "left-0" : "right-0",
                className
            )}
            {...props}
        >
            <ChevronRight className={cn(
                "text-light stroke-1",
                direction === "left" && "rotate-180"
            )}/>
        </button>
    )
}

export default SliderNavButton