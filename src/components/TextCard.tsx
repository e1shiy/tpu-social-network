import {twMerge} from "tailwind-merge";
import clsx from "clsx";
import {useState} from "react";
import EditIcon from "../assets/images/edit.svg?react"
import CopyIcon from "../assets/images/copy.svg?react"
import SaveIcon from "../assets/images/accept.svg?react"
import RejectIcon from "../assets/images/reject.svg?react"
import IconButton from "./buttons/IconButton.tsx";

interface TextCardProps {
    text: string,
    title: string,
    className?: string,
    isReadonly?: boolean,
    onEdit?: (value: string) => void,
    maxLength?: number
}

function TextCard({text, title, className, isReadonly = true, onEdit, maxLength}: TextCardProps) {
    const [isActive, setIsActive] = useState(false)
    const [value, setValue] = useState(text)

    const [isCopied, setIsCopied] = useState(false)
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);

            setTimeout(() => setIsCopied(false), 2000);
        } catch (e) {
            console.error("Error while copying: " + e)
        }
    }

    // todo fade in/out у иконок
    const actionButtons = isActive ?
        <>
            <IconButton
                Icon={SaveIcon}
                className={"scale-110"}
                color="primary"
                onClick={() => {
                    onEdit && onEdit(value)
                    setIsActive(false)
                }}
            />
            <IconButton
                Icon={RejectIcon}
                className={"scale-110"}
                color="error"
                onClick={() => {
                    setValue(text)
                    setIsActive(false)
                }}
            />
        </> :
        <>
            {!isReadonly &&
                <IconButton Icon={EditIcon} onClick={() => setIsActive(true)}/>
            }

            {isCopied ?
                <IconButton Icon={SaveIcon} color="primary"/> :
                <IconButton Icon={CopyIcon} onClick={handleCopy}/>
                // todo анимация смены иконки
            }
        </>

    return (
        <div className={twMerge(clsx(
            "flex flex-col gap-1.5 md:gap-2.5 p-3 md:p-4 rounded-[0.9375rem] md:rounded-[1.25rem] border-1",
            isActive ? "border-primary" : "border-dark/60",
            className
        ))}>
            <div className="flex w-full h-max items-center justify-between gap-1.5 md:gap-2.5">
                <h5>{title}</h5>
                <div className={"flex gap-2 md:gap-3"}>
                    {actionButtons}
                </div>
            </div>

            <textarea
                className={twMerge(clsx(
                    "text-dark/60 h-full field-sizing-content min-h-16 max-h-90 resize-none outline-none rounded-sm",
                ))}
                disabled={!isActive}
                maxLength={maxLength}
                spellCheck={false}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default TextCard