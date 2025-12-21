import {twMerge} from "tailwind-merge";
import clsx from "clsx";
import Button from "./Button.tsx";
import SaveIcon from "../assets/images/accept.svg?react"
import RejectIcon from "../assets/images/reject.svg?react"
import {useEffect, useRef, useState} from "react";

interface TextCardProps {
    text: string,
    title?: string,
    className?: string,
    isReadonly?: boolean,
    onEdit?: (value: string) => void
}

function TextCard({text, title, className, isReadonly = true, onEdit}: TextCardProps) {
    const [isActive, setIsActive] = useState(false)
    const [value, setValue] = useState(text)

    const inputRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const listener = (event: Event) => {
            const target = event.target as HTMLElement | null
            if (target && inputRef.current && inputRef.current.contains(target)) {
                setValue(target.innerText)
            }
        }
        document.addEventListener("input", listener)

        return () => {
            document.removeEventListener("input", listener)
        }
    }, [])

    return (
        <div className={twMerge(clsx(
            "flex flex-col gap-2.5 p-4 rounded-[0.9375rem] md:rounded-[1.25rem] border-1",
            isActive ? "border-primary-alt" : "border-primary",
            !isActive && !isReadonly && "cursor-pointer hover:border-primary-alt",
            className
        ))}
             onClick={() => !isReadonly && !isActive && setIsActive(i => !i)}
        >
            {title && <h5>{title}</h5>}
            <div ref={inputRef} contentEditable={!isReadonly && isActive} className={"text-dark/60 h-full outline-none"}>{value}</div>
            {isActive &&
                <div className={twMerge(clsx(
                    `flex gap-1.25 md:gap-2.5 w-full items-end`,
                    !isActive && "hidden"
                ))}>
                    <Button className={"w-full"} TrailingIcon={SaveIcon} onClick={() => {
                        // todo через ref сохранить изменения
                        onEdit && onEdit(value)
                        setIsActive(false)
                    }}>
                        Сохранить
                    </Button>
                    <Button TrailingIcon={RejectIcon} color={"error"} onClick={() => {
                        setValue(text)
                        setIsActive(false)
                    }}/>
                </div>
            }
        </div>
    )
}

export default TextCard