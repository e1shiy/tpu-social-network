import type {BaseMediaFile} from "../domain";

export type VideoFile = BaseMediaFile & {
    id: number;
    type: "video";
    width: number;
    height: number;
    duration: number;
}

export type ImageFile = BaseMediaFile & {
    id: number;
    type: "image";
    width: number;
    height: number;
}

export type AudioFile = BaseMediaFile & {
    id: number;
    type: "audio";
    duration: number;
}

export type DocumentFile = BaseMediaFile & {
    id: number;
    type: "document";
}

export type MediaFile = VideoFile | ImageFile | AudioFile | DocumentFile;