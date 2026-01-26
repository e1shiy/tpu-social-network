import {useState, type FC, type HTMLAttributes, useRef, type Ref} from 'react';
import {useClickOutside} from "../../hooks";
import Fade from "../wrappers/animations/Fade.tsx";
import {AnimatePresence} from "framer-motion";
import {cn} from "../../utils/cn.ts";

export interface TriggerProps extends HTMLAttributes<HTMLElement> {
    onClick?: () => void;
    isActive?: boolean;
    className?: string;
}

export interface ContentProps extends HTMLAttributes<HTMLElement> {
    className?: string;
    ref?: Ref<HTMLUListElement>;
}

interface DropdownButtonProps {
    Trigger: FC<TriggerProps>;
    Content: FC<HTMLAttributes<HTMLElement>>;
    className?: string;
}

function DropdownButton({Trigger, Content, className}: DropdownButtonProps) {
    const [isActive, setIsActive] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside(dropdownRef, () => setIsActive(false))

    return (
        <div className={"relative"} ref={dropdownRef}>
            <Trigger isActive={isActive} onClick={() => setIsActive(i => !i)}/>
            <AnimatePresence>
                {isActive &&
                    <Fade>
                        <Content className={cn(
                            "absolute top-full translate-y-1.25 md:translate-y-1.75 xl:translate-y-2.5 w-full",
                            className
                        )}/>
                    </Fade>
                }
            </AnimatePresence>

        </div>
    )
}

export default DropdownButton