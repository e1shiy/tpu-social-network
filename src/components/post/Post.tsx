import avatarUrl from "../../assets/images/user-avatar.jpg";
import SendIcon from "../../assets/images/send.svg?react"
import LikeIcon from "../../assets/images/heart.svg?react"
import CommentIcon from "../../assets/images/message-square.svg?react"
import DeleteIcon from "../../assets/images/trash.svg?react"
import EditIcon from "../../assets/images/edit.svg?react"
import CopyIcon from "../../assets/images/copy.svg?react"
import SaveIcon from "../../assets/images/accept.svg?react"
import RejectIcon from "../../assets/images/reject.svg?react"
import {MediaFile, PostPreview, CommentPreview} from "../../types/entities";
import Card from "../wrappers/Card.tsx";
import {toLocalDate} from "../../utils/toLocalDate.ts";
import Fade from "../wrappers/animations/Fade.tsx";
import Bubble from "../wrappers/animations/Bubble.tsx";
import IconButton from "../buttons/IconButton.tsx";
import {AnimatePresence} from "framer-motion";
import {copy} from "../../utils/copy.ts";
import {useEffect, useState} from "react";
import {useIsMyProfile} from "../../hooks";
import {cn} from "../../utils/cn.ts";
import Modal from "../Modal.tsx";
import Attachment from "../media/Attachment.tsx";
import ConfirmAction from "../ConfirmAction.tsx";
import Textarea from "../Textarea.tsx";
import {MAX_COMMENT_LENGTH, MAX_POST_LENGTH} from "../../constants/components/post.ts";
import Button from "../buttons/Button.tsx";
import Comment from "./Comment.tsx";
import {useImmer} from "use-immer";
import SlideDown from "../wrappers/animations/SlideDown.tsx";

type PostProps = PostPreview & {
    onDelete?: () => void,
    onContentChange?: (content: { text: string, attachments: MediaFile[] }) => void
}

function Post({...props}: PostProps) {
    const {onDelete, onContentChange, content, details, commentAmount, likeAmount, isCommentingAllowed} = props
    const {text: originalText, attachments: originalAttachments} = content
    const {creationDate} = details

    // todo user info
    const userAvatar = avatarUrl
    const userName = "Веретнов Алексей"
    const [isLiked, setIsLiked] = useState(false)

    const [isCommentsOpen, setIsCommentsOpen] = useState(false)
    const [comments, setComments] = useImmer<CommentPreview[]>([{
        id: 1,
        text: "ну очень крутой блокбастер",
        author: {
            id: "aav105",
            email: "1eshiy@vk.com",
            name: "Алексей",
            surname: "Веретнов",
            avatarUrl: avatarUrl,
            group: "8К43",
            school: "ИШИТР",
            status: "student",
            isOnline: true
        },
        isEdited: false,
        creationDate: new Date(),
        likeAmount: 0
    }, {
        id: 2,
        text: "да это жёстко",
        author: {
            id: "aav105",
            email: "1eshiy@vk.com",
            name: "Алексей",
            surname: "Веретнов",
            avatarUrl: avatarUrl,
            group: "8К43",
            school: "ИШИТР",
            status: "student",
            isOnline: true
        },
        isEdited: true,
        creationDate: new Date(),
        likeAmount: 10
    }]) // todo api get comments

    const isMyProfile = useIsMyProfile()

    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalItem, setModalItem] = useState<MediaFile | null>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState<string>(originalText)
    const [attachments, setAttachments] = useState(originalAttachments)

    const [commentText, setCommentText] = useState("")
    const sendComment = () => {
        setComments(draft => {
            draft.push({
                id: Date.now(),
                text: commentText,
                author: {
                    id: "aav105",
                    name: "Алексей",
                    surname: "Веретнов",
                    avatarUrl: avatarUrl,
                    email: "1eshiy@vk.com",
                    group: "8К43",
                    school: "ИШИТР",
                    status: "student",
                    isOnline: true
                },
                isEdited: false,
                creationDate: new Date(),
                likeAmount: 0
            })
        })
        setCommentText("")
    } // todo send comment

    const [isMediaLayerOpen, setIsMediaLayerOpen] = useState(false)
    useEffect(() => {
        attachments.length && setIsMediaLayerOpen(true)
    }, [attachments, setIsMediaLayerOpen])

    const [isCopied, setIsCopied] = useState(false)
    const [isCopyError, setIsCopyError] = useState(false)
    const handleCopy = copy("", setIsCopied, setIsCopyError) // todo copy link

    return (
        <>
            <div className={"flex flex-col gap-1.75 md:gap-2 lg:gap-3.25"}>
                <Card className={"flex flex-col gap-3.75 md:gap-5 pb-2.5 md:pb-3.75 lg:pb-4.5 xl:pb-5 grow basis-0"}>
                    <div className={"flex justify-between items-center gap-2"}>
                        <div className={"flex items-center gap-2.5 xl:gap-3.25"}> {/* todo clickable */}
                            <img
                                src={userAvatar}
                                alt="user avatar"
                                className={"w-11.25 md:w-12.5 lg:w-13.75 aspect-square rounded-full"}
                            />
                            <div className={"max-w-full min-w-0"}>
                                <h4 className={"truncate"}>{userName}</h4>
                                <p className={"text-dark/60 truncate"}>{toLocalDate(creationDate)}</p>
                            </div>
                        </div>
                        <div className={"flex gap-2 lg:gap-3"}>
                            <AnimatePresence mode="popLayout" initial={false}>
                                {isCopied ? (
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
                                ))}
                                {isEditing ? (
                                    <div key="editing-actions" className="flex gap-2 lg:gap-3">
                                        <Fade key={"saveChanges"}>
                                            <Bubble>
                                                <IconButton
                                                    Icon={SaveIcon}
                                                    className={"scale-110"}
                                                    color="primary"
                                                    onClick={() => {
                                                        onContentChange?.({text, attachments})
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
                                                        setAttachments(originalAttachments)
                                                        setText(originalText)
                                                        setIsEditing(false)
                                                    }}
                                                />
                                            </Bubble>
                                        </Fade>
                                    </div>
                                ) : isMyProfile && (
                                    <div key="my-profile-actions" className={"flex gap-2 lg:gap-3"}>
                                        <Fade key={"edit"}>
                                            <Bubble>
                                                <IconButton
                                                    Icon={EditIcon}
                                                    onClick={() => setIsEditing(true)}
                                                />
                                            </Bubble>
                                        </Fade>
                                        <Fade key={"delete"}>
                                            <Bubble>
                                                <IconButton
                                                    Icon={DeleteIcon}
                                                    className={"hover:text-error"}
                                                    onClick={() => setIsConfirmOpen(true)}
                                                />
                                            </Bubble>
                                        </Fade>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className={cn(
                        "flex gap-3 flex-wrap md:gap-3.75",
                        !isMediaLayerOpen && "hidden"
                    )}>
                        <AnimatePresence onExitComplete={() => !attachments.length && setIsMediaLayerOpen(false)}>
                            {attachments.map(attachment => {
                                return (
                                    <Fade layout={isEditing} key={attachment.id}>
                                        <Attachment
                                            file={attachment}
                                            context={{
                                                isEditing: isEditing,
                                                onDelete: () => setAttachments(a => a.filter(att => att.id !== attachment.id)),
                                                isExpanded: false,
                                                onExpand: () => {
                                                    setModalItem(attachment)
                                                    setIsModalOpen(true)
                                                }
                                            }}
                                        />
                                    </Fade>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                    <Textarea
                        focusOnEnable
                        disabled={!isEditing}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={"Текст изменённого поста"}
                        maxLength={MAX_POST_LENGTH}
                        className={"grow placeholder-dark/60 text-dark min-h-4 md:min-h-5 max-h-75"}
                    />
                    <div className={"flex gap-2.5 md:gap-3.75"}>
                        <Button
                            LeadingIcon={LikeIcon}
                            color={isLiked ? "error" : "dark"} fill
                            size={"small"}
                            onClick={() => setIsLiked(l => !l)}
                        >
                            {likeAmount + (isLiked ? 1 : 0)}
                        </Button> {/* todo dislikes */}

                        {isCommentingAllowed && (
                            <Button
                                LeadingIcon={CommentIcon}
                                color={isCommentsOpen ? "primary" : "dark"} fill
                                size={"small"}
                                onClick={() => setIsCommentsOpen(c => !c)}
                            >
                                {commentAmount}
                            </Button>
                        )} {/* todo может быть в секции комментариев писать "комментарии закрыты", а не кнопку удалять? */}
                    </div>
                </Card>
                <AnimatePresence>
                    {isCommentingAllowed && isCommentsOpen && (
                        <SlideDown className={"flex flex-col gap-1.25 md:gap-2.5 grow basis-0"}>
                            <Card className={"h-full flex flex-col gap-3.75 md:gap-4.25 lg:gap-5 xl:gap-6.25"}>
                                {comments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        {...comment}
                                        onEdit={(text: string) => setComments(draft => {
                                            const commentToChange = draft.find(c => c.id === comment.id)
                                            if (commentToChange) {
                                                commentToChange.text = text
                                            }
                                        })}
                                        onDelete={() => setComments(c => c.filter(comm => comm.id !== comment.id))}
                                    /> /* todo post api comment change/delete */
                                ))}
                            </Card>
                            <Card className={cn(
                                "flex justify-between items-center gap-1",
                                "p-3.75 md:p-4 lg:p-4.5 xl:p-5 rounded-[0.625rem] lg:rounded-[0.875rem]"
                            )}>
                                <Textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder={"Текст комментария"}
                                    maxLength={MAX_COMMENT_LENGTH}
                                    className={"grow placeholder-dark/60 text-dark min-h-4 md:min-h-5 max-h-50"}
                                />

                                <IconButton
                                    Icon={SendIcon}
                                    className={cn(
                                        "aspect-square flex rotate-45 text-dark shrink-0",
                                        !commentText.length && "cursor-default opacity-60"
                                    )}
                                    onClick={() => commentText.length && sendComment()}
                                />
                            </Card>
                        </SlideDown>
                    )}
                </AnimatePresence>
            </div>

            <Modal isOpened={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={"h-[70dvh] lg:h-[83dvh] w-[92vw] lg:w-[52vw] flex-center"}>
                    <div className={cn(
                        "h-full w-full bg-dark/75 flex-center overflow-hidden",
                        "rounded-[0.625rem] md:rounded-[0.85rem] lg:rounded-[1rem] xl:rounded-[1.25rem] 2xl:rounded-[1.5625rem]"
                    )}>
                        {modalItem && (
                            <Attachment
                                file={modalItem}
                                context={{
                                    isEditing: false,
                                    isExpanded: true
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal> {/* todo fullscreen post */}
            <ConfirmAction
                text={"Удалить пост?"}
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

export default Post