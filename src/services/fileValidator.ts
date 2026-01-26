import {IMAGE_TYPES} from "../constants/services/fileTypes.ts";
import {getPostAttachmentPreview} from "./filePreviewService.ts";

interface validateResponse {
    data: string[],
    isError: boolean
}

export function validateAvatar(file: File): validateResponse {
    const {size, type} = file
    const errors: string[] = []
    if (size / 1024 / 1024 > 5) {
        errors.push("Размер фото не должен превышать 5 МБ")
    }
    if (IMAGE_TYPES.every(t => t !== type)) {
        errors.push("Фото должно быть одного из форматов: jpg, png, webp, heic")
    }
    return {data: errors, isError: errors.length !== 0}
}

export function validatePostAttachment(file: File): validateResponse {
    const errors: string[] = []
    const {size, name} = file
    const {previewSrc, type} = getPostAttachmentPreview(file)

    switch (type) {
        case "video":
            if (size / 1024 / 1024 > 500) {
                errors.push(`Файл ${name} превышает допустимый размер в 500 МБ`)
            }
            break
        case "image":
            if (size / 1024 / 1024 > 10) {
                errors.push(`Файл ${name} превышает допустимый размер в 10 МБ`)
            }
            break
        case "file":
            if (size / 1024 / 1024 > 10) {
                errors.push(`Файл ${name} превышает допустимый размер в 10 МБ`)
            }
            break
        case "unknown":
            errors.push(`Файл ${name} не соответствует допустимому формату`)
    }
    return errors.length ? {data: errors, isError: true} : {data: [previewSrc], isError: false}
}