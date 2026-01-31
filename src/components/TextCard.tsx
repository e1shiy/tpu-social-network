import {useState} from "react";
import EditIcon from "../assets/images/edit.svg?react"
import CopyIcon from "../assets/images/copy.svg?react"
import SaveIcon from "../assets/images/accept.svg?react"
import RejectIcon from "../assets/images/reject.svg?react"
import IconButton from "./buttons/IconButton.tsx";
import {AnimatePresence} from "framer-motion";
import Fade from "./wrappers/animations/Fade.tsx";
import Bubble from "./wrappers/animations/Bubble.tsx";
import {cn} from "../utils/cn.ts";
import {copy} from "../utils/copy.ts";

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
    const [isCopyError, setIsCopyError] = useState(false)

    const handleCopy = copy(value, setIsCopied, setIsCopyError)

    return (
        <div className={cn(
            "flex flex-col gap-1.5 md:gap-2.5 p-3 md:p-4 rounded-[0.9375rem] md:rounded-[1.25rem] border-1",
            isActive ? "border-primary" : "border-dark/60",
            className
        )}>
            <div className="flex w-full h-max items-center justify-between gap-1.5 md:gap-2.5">
                <h5>{title}</h5>
                <div className={"flex gap-2 md:gap-3"}>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {isActive ? (
                            <div key="active-actions" className="flex gap-1.5 md:gap-2.5">
                                <Fade key={"saveChanges"}>
                                    <Bubble>
                                        <IconButton
                                            Icon={SaveIcon}
                                            className={"scale-110"}
                                            color="primary"
                                            onClick={() => {
                                                onEdit && onEdit(value)
                                                setIsActive(false)
                                            }}
                                        />
                                    </Bubble>
                                </Fade>
                                <Fade key={"discardChanges"}>
                                    <Bubble>
                                        <IconButton
                                            Icon={RejectIcon}
                                            className={"scale-110"}
                                            color="error"
                                            onClick={() => {
                                                setValue(text)
                                                setIsActive(false)
                                            }}
                                        />
                                    </Bubble>
                                </Fade>
                            </div>
                        ) : (
                            <div key="edit-action">
                                {!isReadonly && (
                                    <Fade key={"editBio"}>
                                        <Bubble>
                                            <IconButton
                                                Icon={EditIcon}
                                                onClick={() => setIsActive(true)}
                                            />
                                        </Bubble>
                                    </Fade>
                                )}
                            </div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence mode="popLayout" initial={false}>
                        {!isActive && (
                            isCopied ? (
                                <div key={"copied-wrapper"}>
                                    <Fade key={"copied"}>
                                        <Bubble>
                                            <IconButton
                                                Icon={SaveIcon}
                                                color="primary"
                                                className={"scale-110"}
                                            />
                                        </Bubble>
                                    </Fade>
                                </div>
                            ) : (isCopyError ? (
                                <div key={"not-copied-wrapper"}>
                                    <Fade key={"not-copied"}>
                                        <Bubble>
                                            <IconButton
                                                Icon={RejectIcon}
                                                color={"error"}
                                                className={"scale-110"}
                                            />
                                        </Bubble>
                                    </Fade>
                                </div>
                            ) : (
                                <div key={"copy-wrapper"}>
                                    <Fade key={"copy"}>
                                        <Bubble>
                                            <IconButton
                                                Icon={CopyIcon}
                                                onClick={handleCopy}
                                            />
                                        </Bubble>
                                    </Fade>
                                </div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <textarea
                className={"text-dark/60 h-full field-sizing-content min-h-16 max-h-90 resize-none outline-none rounded-sm"}
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