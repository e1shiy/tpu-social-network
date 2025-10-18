export type BaseMediaFile = {
    type: "audio" | "video" | "image" | "document";
    id: number;
    name: string;
    url: string;
    size: number; // bytes
}