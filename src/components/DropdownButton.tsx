import {useState, type FC, type HTMLAttributes, useRef, useEffect, type Ref} from 'react';
import {twMerge} from "tailwind-merge";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

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

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const target = event.target;
            if (dropdownRef.current && !dropdownRef.current.contains(target as Node)) {
                setIsActive(false)
            }
        }
        document.addEventListener("click", listener)

        return () => {
            document.removeEventListener("click", listener)
        }
    }, [])

    const MotionContent = motion.create(Content, {forwardMotionProps: true})

    return(
        <div className={"relative"} ref={dropdownRef}>
            <Trigger isActive={isActive} onClick={() => setIsActive(i => !i)} />
            <AnimatePresence>
                {isActive && <MotionContent
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{ ease: "easeOut", duration: .15 }}
                    className={twMerge(clsx(
                        "absolute top-full translate-y-1.25 md:translate-y-1.75 xl:translate-y-2.5 w-full",
                        className
                    ))}
                />}
            </AnimatePresence>
        </div>
    )
}

export default DropdownButton