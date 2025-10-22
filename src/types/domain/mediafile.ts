export type MediaFileType = "audio" | "video" | "image" | "document"

export type BaseMediaFile = {
    type: MediaFileType;
    name: string;
    url: string;
    size: number; // bytes
}