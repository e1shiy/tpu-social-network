import {FILE_TYPES, IMAGE_TYPES, VIDEO_TYPES} from "../constants/services/fileTypes.ts";

interface getPreviewResponse {
    previewSrc: string,
    type: "image" | "video" | "file" | "unknown"
}

export function getPostAttachmentPreview(file: File): getPreviewResponse {
    const { type, name } = file
    const extension = name.substring(name.lastIndexOf(".")).toLowerCase()

    if (VIDEO_TYPES.includes(type)) {
        return {
            previewSrc: "", // todo video file type preview
            type: "video"
        }
    } else if (IMAGE_TYPES.includes(type)) {
        return {
            previewSrc: URL.createObjectURL(file),
            type: "image"
        }
    } else if (type.startsWith("audio/") || FILE_TYPES.includes(extension)) {
        return {
            previewSrc: "", // todo file preview
            type: "file"
        }
    } else {
        return {
            previewSrc: "", // todo unknown file type preview
            type: "unknown"
        }
    }
}