import {ALLOWED_TYPES} from "../constants/services/avatarValidator.ts";

interface validateResponse {
    messages: string[],
    isError: boolean
}

export function validateAvatar(file: File): validateResponse {
    const {size, type} = file
    const errors: string[] = []
    if (size / 1024 / 1024 > 5) {
        errors.push("Размер фото не должен превышать 5 МБ")
    }
    if (ALLOWED_TYPES.every(t => t !== type)) {
        errors.push("Фото должно быть одного из форматов: jpg, png, webp, heic")
    }

    if (errors.length) {
        return {
            messages: errors,
            isError: true
        }
    }
    return {
        messages: [],
        isError: false
    }
}