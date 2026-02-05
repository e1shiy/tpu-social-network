import {CommentPreview} from "../../types/entities";
import {useIsMyProfile} from "../../hooks";
import {useState} from "react";
import Textarea from "../Textarea.tsx";
import {toLocalDate} from "../../utils/toLocalDate.ts";
import {AnimatePresence} from "framer-motion";
import Fade from "../wrappers/animations/Fade.tsx";
import Bubble from "../wrappers/animations/Bubble.tsx";
import IconButton from "../buttons/IconButton.tsx";
import DeleteIcon from "../../assets/images/trash.svg?react"
import EditIcon from "../../assets/images/edit.svg?react"
import SaveIcon from "../../assets/images/accept.svg?react"
import RejectIcon from "../../assets/images/reject.svg?react"
import ConfirmAction from "../ConfirmAction.tsx";

interface CommentProps extends CommentPreview {
    onDelete?: () => void,
    onEdit?: (text: string) => void
}

function Comment({onDelete, onEdit, ...props}: CommentProps) { // todo isEdited and likes
    const {text: originalText, author, creationDate} = props
    const {id, avatarUrl, name, surname} = author // todo status and isOnline(?)

    const isMyComment = useIsMyProfile(id)
    const isMyPostComment = useIsMyProfile()

    const [text, setText] = useState(originalText)
    const [isEditing, setIsEditing] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const [isHovered, setIsHovered] = useState(false)

    return (
        <>
            <div
                className={"group flex items-start gap-1.25 md:gap-2.5"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            > {/* todo clickable */}
                <img src={avatarUrl} alt="user avatar" className={"aspect-square rounded-full w-8 md:w-9.25 lg:w-10.5"}/>
                <div className={"flex flex-col w-full"}>
                    <div className={"flex justify-between items-center gap-1 lg:gap-2"}>
                        <h5>{surname} {name}</h5>
                        <div className={"flex gap-2 lg:gap-3"}>
                            <AnimatePresence mode="popLayout" initial={false}>
                                {isHovered && (
                                    <Fade>
                                        {isEditing ? (
                                            <div key="editing-actions" className="flex gap-2 lg:gap-3">
                                                <Fade key={"saveChanges"}>
                                                    <Bubble>
                                                        <IconButton
                                                            Icon={SaveIcon}
                                                            className={"scale-110"}
                                                            color="primary"
                                                            onClick={() => {
                                                                onEdit?.(text)
                                                                setIsEditing(false)
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
                                                                setText(originalText)
                                                                setIsEditing(false)
                                                            }}
                                                        />
                                                    </Bubble>
                                                </Fade>
                                            </div>
                                        ) : (
                                            <div key="privileged-actions" className={"flex gap-2 lg:gap-3"}>
                                                {isMyComment &&
                                                    <Fade key={"edit"}>
                                                        <Bubble>
                                                            <IconButton
                                                                Icon={EditIcon}
                                                                onClick={() => setIsEditing(true)}
                                                            />
                                                        </Bubble>
                                                    </Fade>
                                                }
                                                {(isMyPostComment || isMyComment) &&
                                                    <Fade key={"delete"}>
                                                        <Bubble>
                                                            <IconButton
                                                                Icon={DeleteIcon}
                                                                className={"hover:text-error"}
                                                                onClick={() => setIsConfirmOpen(true)}
                                                            />
                                                        </Bubble>
                                                    </Fade>
                                                }
                                            </div>
                                        )}
                                    </Fade>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <Textarea
                        focusOnEnable
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={!isEditing}
                    />
                    <p className={"text-dark/60 text-[0.6825rem] md:text-[0.75rem] lg:text-[0.825rem] xl:text-[0.9rem] 2xl:text-[0.95rem]"}>{toLocalDate(creationDate)}</p>
                </div>
            </div>

            <ConfirmAction
                text={"Удалить комментарий?"}
                isOpen={isConfirmOpen}
                onConfirm={() => {
                    setIsConfirmOpen(false)
                    onDelete?.()
                }}
                onReject={() => setIsConfirmOpen(false)}
            />
        </>
    )
}

export default Comment