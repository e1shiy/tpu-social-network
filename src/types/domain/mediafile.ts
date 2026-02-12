export type MediaFileType = "image" | "video" | "audio" | "document"

export type BaseMediaFile = {
    type: MediaFileType;
    file: File | null;
    previewUrl: string;
    sourceUrl: string;
    name: string;
}

export type ImageMetadata = {type: "image", width: number, height: number, previewUrl: string, sourceUrl: string}
export type VideoMetadata = {type: "video", width: number, height: number, duration: number, previewUrl: string, sourceUrl: string}
export type AudioMetadata = {type: "audio", duration: number, previewUrl: string, sourceUrl: string}
export type DocumentMetadata = {type: "document", previewUrl: string, sourceUrl: string, size: number}
export type MediaFileMetadata = ImageMetadata | VideoMetadata | AudioMetadata | DocumentMetadata