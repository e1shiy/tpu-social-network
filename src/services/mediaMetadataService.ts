import {MediaFileMetadata, MediaFileType} from "../types/domain";

type TargetMeta<T extends MediaFileType> = Extract<MediaFileMetadata, { type: T }>

export function getMediaMetadata<T extends MediaFileType>(
    file: File, type: T
): Promise<TargetMeta<T>> {
    return new Promise((resolve, reject) => {
        const {name} = file
        const blobUrl = URL.createObjectURL(file)

        const handleReject = (message: string) => {
            URL.revokeObjectURL(blobUrl)
            reject(new Error(message))
        }

        switch (type) {
            case "video": {
                const video = document.createElement('video')
                const previewUrl = `${blobUrl}#t=0.1`
                video.preload = 'metadata'
                video.src = previewUrl
                video.onloadedmetadata = () => resolve({
                    previewUrl: previewUrl,
                    sourceUrl: blobUrl,
                    type: "video",
                    width: video.videoWidth,
                    height: video.videoHeight,
                    duration: video.duration
                } as TargetMeta<T>)
                video.onerror = () => handleReject(`Ошибка чтения видео: ${name}`)
                break
            }
            case "image": {
                const img = new Image()
                img.src = blobUrl
                img.onload = () => resolve({
                    previewUrl: blobUrl,
                    sourceUrl: blobUrl,
                    type: "image",
                    width: img.width,
                    height: img.height
                } as TargetMeta<T>)
                img.onerror = () => handleReject(`Ошибка чтения изображения: ${name}`)
                break
            }
            case "audio": {
                const audio = new Audio()
                audio.src = blobUrl
                audio.onloadedmetadata = () => resolve({
                    previewUrl: "", // todo audio file preview
                    sourceUrl: blobUrl,
                    type: "audio",
                    duration: audio.duration
                } as TargetMeta<T>)
                audio.onerror = () => handleReject(`Ошибка чтения аудио: ${name}`)
                break
            }
            case "document": {
                resolve({
                    previewUrl: "", // todo document file type preview
                    sourceUrl: blobUrl,
                    size: file.size,
                    type: "document"
                } as TargetMeta<T>)
                break
            }
        }
    })
}