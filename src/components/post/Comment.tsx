import {CommentPreview} from "../../types/entities";
import {useIsMyProfile} from "../../hooks";
import {useState} from "react";
import Textarea from "../Textarea.tsx";
import {toLocalDate} from "../../utils/toLocalDate.ts";
import {AnimatePresence, motion} from "framer-motion";
import IconButton from "../buttons/IconButton.tsx";
import DeleteIcon from "../../assets/images/trash.svg?react"
import EditIcon from "../../assets/images/edit.svg?react"
import SaveIcon from "../../assets/images/accept.svg?react"
import RejectIcon from "../../assets/images/reject.svg?react"
import ConfirmAction from "../ConfirmAction.tsx";
import {isMobileDevice} from "../../utils/isMobileDevice.ts";
import {Link} from "react-router-dom";
import {bubble, fade} from "../../constants/animations.ts";
import {mergeAnimations} from "../../utils/animations.ts";

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
                onClick={() => isMobileDevice() && setIsHovered(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            > {/* todo clickable */}
                <Link to={`/${id}`}>
                    <img src={avatarUrl} alt="user avatar" className={"aspect-square rounded-full w-8 md:w-9.25 lg:w-10.5"}/>
                </Link>
                <div className={"flex flex-col w-full"}>
                    <div className={"flex justify-between items-center gap-1 lg:gap-2"}>
                        <Link to={`/${id}`}>
                            <h5>{surname} {name}</h5>
                        </Link>
                        <div className={"flex gap-2 lg:gap-3 relative"}>
                            <AnimatePresence mode="popLayout" initial={false}>
                                {isHovered && (
                                    <motion.div
                                        key={isEditing ? "edit" : "idle"}
                                        {...fade}
                                        className={"flex gap-2 lg:gap-3 absolute top-0 right-0 -translate-y-1/2"}
                                    >
                                        {isEditing ? (
                                            <>
                                                <motion.div key={"save-changes-comment"} {...mergeAnimations(fade, bubble)}>
                                                    <IconButton
                                                        Icon={SaveIcon}
                                                        className={"scale-110"}
                                                        color="primary"
                                                        onClick={() => {
                                                            onEdit?.(text)
                                                            setIsEditing(false)
                                                        }}
                                                    />
                                                </motion.div>
                                                <motion.div key={"discard-changes-comment"} {...mergeAnimations(fade, bubble)}>
                                                    <IconButton
                                                        Icon={RejectIcon}
                                                        className={"scale-110"}
                                                        color="error"
                                                        onClick={() => {
                                                            setText(originalText)
                                                            setIsEditing(false)
                                                        }}
                                                    />
                                                </motion.div>
                                            </>
                                        ) : (
                                            <>
                                                {isMyComment &&
                                                    <motion.div key={"edit-comment"} {...mergeAnimations(fade, bubble)}>
                                                        <IconButton
                                                            Icon={EditIcon}
                                                            onClick={() => setIsEditing(true)}
                                                        />
                                                    </motion.div>
                                                }
                                                {(isMyPostComment || isMyComment) &&
                                                    <motion.div key={"delete-comment"} {...mergeAnimations(fade, bubble)}>
                                                        <IconButton
                                                            Icon={DeleteIcon}
                                                            className={"hover:text-error"}
                                                            onClick={() => setIsConfirmOpen(true)}
                                                        />
                                                    </motion.div>
                                                }
                                            </>
                                        )}
                                    </motion.div>
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