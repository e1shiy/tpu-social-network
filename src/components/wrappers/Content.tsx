import {cn} from "../../utils/cn.ts";

interface ContentProps {
    className?: string,
    children?: React.ReactNode
}

function Content({className, children}: ContentProps) {
    return(
        <div className={cn(
            "grow overflow-y-auto",
            className
        )}>
            {children}
        </div>
    )
}

export default Content