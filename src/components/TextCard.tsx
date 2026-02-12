import {useState} from "react";
import EditIcon from "../assets/images/edit.svg?react"
import CopyIcon from "../assets/images/copy.svg?react"
import SaveIcon from "../assets/images/accept.svg?react"
import RejectIcon from "../assets/images/reject.svg?react"
import IconButton from "./buttons/IconButton.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "../utils/cn.ts";
import Textarea from "./Textarea.tsx";
import {copy} from "../utils/copy.ts";
import {mergeAnimations} from "../utils/animations.ts";
import {bubble, fade} from "../constants/animations.ts";

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
                <div className={"flex gap-2 lg:gap-3 relative"}>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {isActive ? (
                            <div key="editing-actions-text-card" className="flex gap-1.5 md:gap-2.5">
                                <motion.div key={"save-changes-text-card"} {...mergeAnimations(fade, bubble)}>
                                    <IconButton
                                        Icon={SaveIcon}
                                        className={"scale-110"}
                                        color="primary"
                                        onClick={() => {
                                            onEdit && onEdit(value)
                                            setIsActive(false)
                                        }}
                                    />
                                </motion.div>
                                <motion.div key={"discard-changes-text-card"} {...mergeAnimations(fade, bubble)}>
                                    <IconButton
                                        Icon={RejectIcon}
                                        className={"scale-110"}
                                        color="danger"
                                        onClick={() => {
                                            setValue(text)
                                            setIsActive(false)
                                        }}
                                    />
                                </motion.div>
                            </div>
                        ) : (
                            <div key="edit-action-text-card">
                                {!isReadonly && (
                                    <motion.div key={"edit-text-card"} {...mergeAnimations(fade, bubble)}>
                                        <IconButton
                                            Icon={EditIcon}
                                            onClick={() => setIsActive(true)}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {!isActive && (
                            isCopied ? (
                                <div key={"copied-wrapper"}>
                                    <motion.div key={"copied"} {...mergeAnimations(fade, bubble)}>
                                        <IconButton
                                            Icon={SaveIcon}
                                            color="primary"
                                            className={"scale-110"}
                                        />
                                    </motion.div>
                                </div>
                            ) : (isCopyError ? (
                                <div key={"not-copied-wrapper"}>
                                    <motion.div key={"not-copied"} {...mergeAnimations(fade, bubble)}>
                                        <IconButton
                                            Icon={RejectIcon}
                                            color={"danger"}
                                            className={"scale-110"}
                                        />
                                    </motion.div>
                                </div>
                            ) : (
                                <div key={"copy-wrapper"}>
                                    <motion.div key={"copy"} {...mergeAnimations(fade, bubble)}>
                                        <IconButton
                                            Icon={CopyIcon}
                                            onClick={handleCopy}
                                        />
                                    </motion.div>
                                </div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Textarea
                focusOnEnable
                className={"text-dark/60 h-full min-h-16 max-h-90 rounded-sm"}
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