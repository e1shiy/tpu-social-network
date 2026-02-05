import SendIcon from "../../assets/images/send.svg?react"
import PhotoIcon from "../../assets/images/camera.svg?react"
import VideoIcon from "../../assets/images/video.svg?react"
import FileIcon from "../../assets/images/file.svg?react"
import {ChangeEvent, useState} from "react";
import Card from "../wrappers/Card.tsx";
import IconButton from "../buttons/IconButton.tsx";
import Button from "../buttons/Button.tsx";
import {cn} from "../../utils/cn.ts";
import {AUDIO_TYPES, DOCUMENT_TYPES, IMAGE_TYPES, VIDEO_TYPES} from "../../constants/services/mediaFiles.ts";
import FileUploader from "../FileUploader.tsx";
import {AnimatePresence} from "framer-motion";
import {useStore} from "../../store/store.ts";
import {validatePostAttachment} from "../../services/mediaValidateService.ts";
import Textarea from "../Textarea.tsx";
import {MediaFile} from "../../types/entities";
import Fade from "../wrappers/animations/Fade.tsx";
import Attachment from "../media/Attachment.tsx";
import {MAX_POST_LENGTH} from "../../constants/components/post.ts";

function ProfilePostCreator() {
    const {showPopUp} = useStore()

    const createPost = () => {
        setAttachments([])
        setIsMediaLayerOpen(false)
        setValue("")
        showPopUp("Пост опубликован", "success")
    }
    const [value, setValue] = useState("")
    const [attachments, setAttachments] = useState<MediaFile[]>([])
    const [isMediaLayerOpen, setIsMediaLayerOpen] = useState(false)

    const uploadAttachment = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        const files = Array.from(e.target.files)
        const newAttachments: MediaFile[] = []
        for (const file of files) {
            if (attachments.length + newAttachments.length === 10) {
                showPopUp("Нельзя загрузить более 10 вложений", "error")
                break
            }

            const validate = await validatePostAttachment(file)
            if (validate.isValid) {
                newAttachments.push(validate.data)
            } else {
                validate.errors.forEach(message => showPopUp(message, "error"))
            }
        }
        setAttachments(a => [...a, ...newAttachments])
        setIsMediaLayerOpen(true)
        e.target.value = ""
    }

    return (
        <Card className={"flex flex-col gap-3.75 md:gap-5 pb-2.5 md:pb-3.75 lg:pb-4.5 xl:pb-5"}>
            <div className={cn(
                "flex flex-wrap gap-2 md:gap-3",
                !isMediaLayerOpen && "hidden"
            )}>
                <AnimatePresence onExitComplete={() => !attachments.length && setIsMediaLayerOpen(false)}>
                    {attachments.map(a => (
                        <Fade layout key={a.id}>
                            <Attachment
                                file={a}
                                context={{
                                    isEditing: true,
                                    isExpanded: false,
                                    onDelete: () => setAttachments(at => at.filter(attachment => attachment.id !== a.id))
                                }}
                                size={"small"}
                            />
                        </Fade>
                    ))}
                </AnimatePresence>
            </div>
            <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={"Текст нового поста"}
                maxLength={MAX_POST_LENGTH}
                className={"grow placeholder-dark/60 text-dark min-h-4 md:min-h-5 max-h-75"}
            />
            <div className={"flex gap-1 justify-between items-center w-full"}>
                <div className="flex gap-2.5 md:gap-3.75">
                    <FileUploader accept={IMAGE_TYPES.join(", ")} multiple onChange={uploadAttachment}>
                        <Button LeadingIcon={PhotoIcon} color={"dark"} size={"small"}>Фото</Button>
                    </FileUploader>

                    <FileUploader accept={VIDEO_TYPES.join(", ")} multiple onChange={uploadAttachment}>
                        <Button LeadingIcon={VideoIcon} color={"dark"} size={"small"}>Видео</Button>
                    </FileUploader>

                    <FileUploader accept={DOCUMENT_TYPES.concat(AUDIO_TYPES).join(", ")} multiple onChange={uploadAttachment}>
                        <Button LeadingIcon={FileIcon} color={"dark"} size={"small"}>Файл</Button>
                    </FileUploader>
                </div>

                <IconButton
                    Icon={SendIcon}
                    className={cn(
                        "aspect-square flex rotate-45 text-dark shrink-0",
                        !value.length && !attachments.length && "cursor-default opacity-60"
                    )}
                    onClick={() => (value.length || attachments.length) && createPost()}
                />
            </div>
        </Card>
    )
}

export default ProfilePostCreator