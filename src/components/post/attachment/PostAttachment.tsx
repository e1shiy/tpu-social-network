import ImageAttachment from "./ImageAttachment.tsx";
import {MediaFile} from "../../../types/entities";

export type AttachmentSize = "small" | "normal"

interface PostAttachmentProps {
    file: MediaFile,
    context: {
        isEditing: boolean,
        isModalOpen: boolean,
        onExpand?: () => void,
        onDelete?: () => void
    },
    size?: AttachmentSize
}

function PostAttachment({file, context, size}: PostAttachmentProps) {
    const {isEditing, isModalOpen, onExpand, onDelete} = context
    switch (file.type) {
        case "image":
            return (
                <ImageAttachment
                    key={file.id}
                    file={file}
                    isEditing={isEditing}
                    isExpanded={isModalOpen}
                    onExpand={onExpand}
                    onDelete={onDelete}
                    size={size}
                />
            )
    }
}

export default PostAttachment