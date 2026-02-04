import avatarUrl from "../../assets/images/user-avatar.jpg";
import DeleteIcon from "../../assets/images/trash.svg?react"
import EditIcon from "../../assets/images/edit.svg?react"
import CopyIcon from "../../assets/images/copy.svg?react"
import SaveIcon from "../../assets/images/accept.svg?react"
import RejectIcon from "../../assets/images/reject.svg?react"
import {MediaFile, PostPreview} from "../../types/entities";
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

type PostProps = PostPreview & {
    onDelete?: () => void,
    onContentChange?: (content: { text: string, attachments: MediaFile[] }) => void
}

function Post(
    {
        onDelete,
        onContentChange,
        // id,
        content: {text, attachments: originalAttachments},
        details: {creationDate},
        // commentAmount,
        // likeAmount,
        // dislikeAmount,
        // isCommentingAllowed
    }: PostProps
) {

    // todo user info
    const userAvatar = avatarUrl
    const userName = "Веретнов Алексей"

    const isMyProfile = useIsMyProfile()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalItem, setModalItem] = useState<MediaFile | null>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [attachments, setAttachments] = useState(originalAttachments)

    const [isMediaLayerOpen, setIsMediaLayerOpen] = useState(false)
    useEffect(() => {
        attachments.length && setIsMediaLayerOpen(true)
    }, [attachments, setIsMediaLayerOpen])


    const [isCopied, setIsCopied] = useState(false)
    const [isCopyError, setIsCopyError] = useState(false)
    const handleCopy = copy("", setIsCopied, setIsCopyError) // todo copy link

    return (
        <>
            <Card className={"flex flex-col gap-3.75 md:gap-5 pb-2.5 md:pb-3.75 lg:pb-4.5 xl:pb-5"}>
                <div className={"flex justify-between items-center gap-2"}>
                    <div className={"flex items-center gap-2.5 xl:gap-3.25"}>
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
                                                onClick={onDelete}
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
                                <Fade layout key={attachment.id}>
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
            </Card>
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
            </Modal>
        </>
    )
}

export default Post