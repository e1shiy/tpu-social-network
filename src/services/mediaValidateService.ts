import {
    AUDIO_MAX_SIZE, DOCUMENT_MAX_SIZE,
    DOCUMENT_TYPES,
    IMAGE_MAX_SIZE,
    IMAGE_TYPES,
    VIDEO_MAX_SIZE,
    VIDEO_TYPES
} from "../constants/media.ts";
import {getMediaMetadata} from "./mediaMetadataService.ts";
import {MediaFileType} from "../types/domain";
import {MediaFile} from "../types/entities";
import {formatBytesToMB} from "../utils/format.ts";

export type ValidateResponse = {
    isValid: true,
    data: MediaFile
} | {
    isValid: false,
    errors: string[]
}

export async function validateAvatar(file: File): Promise<ValidateResponse> {
    const {size, type} = file
    const errors: string[] = []
    if (size > IMAGE_MAX_SIZE) {
        errors.push("Размер файла не должен превышать 10 МБ")
    }
    if (IMAGE_TYPES.every(t => t !== type)) {
        errors.push("Загружен файл неподдерживаемого типа")
    }
    if (errors.length) return {isValid: false, errors: errors}

    const metadata = await getMediaMetadata(file, "image")
    return {
        isValid: true,
        data: {
            id: Date.now() * Math.random(),
            name: file.name,
            file,
            ...metadata
        }
    }
}

export async function validatePostAttachment(file: File): Promise<ValidateResponse> {
    const errors: string[] = []
    const {size, name, type} = file
    const extension = name.substring(name.lastIndexOf(".")).toLowerCase()

    let mediaFileType: MediaFileType | undefined = undefined
    if (VIDEO_TYPES.includes(type)) {
        mediaFileType = "video"
        if (size > VIDEO_MAX_SIZE) {
            errors.push(`${name} превышает допустимый размер в ${formatBytesToMB(VIDEO_MAX_SIZE)} МБ`)
        }
    } else if (IMAGE_TYPES.includes(type)) {
        mediaFileType = "image"
        if (size > IMAGE_MAX_SIZE) {
            errors.push(`${name} превышает допустимый размер в ${formatBytesToMB(IMAGE_MAX_SIZE)} МБ`)
        }
    } else if (type.startsWith("audio/")) {
        mediaFileType = "audio"
        if (size > AUDIO_MAX_SIZE) {
            errors.push(`${name} превышает допустимый размер в ${formatBytesToMB(AUDIO_MAX_SIZE)} МБ`)
        }
    } else if (DOCUMENT_TYPES.includes(type) || DOCUMENT_TYPES.includes(extension)) {
        mediaFileType = "document"
        if (size > DOCUMENT_MAX_SIZE) {
            errors.push(`${name} превышает допустимый размер в ${formatBytesToMB(DOCUMENT_MAX_SIZE)} МБ`)
        }
    } else {
        errors.push("Загружен файл неподдерживаемого типа")
    }
    if (errors.length || !mediaFileType) return {isValid: false, errors: errors}

    try {
        const metadata = await getMediaMetadata(file, mediaFileType)
        return {
            isValid: true,
            data: {
                id: Date.now() * Math.random(),
                name: file.name,
                file,
                ...metadata
            }
        }
    } catch (e) {
        return {isValid: false, errors: [(e as Error).message]}
    }
}