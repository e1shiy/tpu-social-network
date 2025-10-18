import type {BaseMediaFile} from "../domain";

export type VideoFile = BaseMediaFile & {
    type: "video";
    width: number;
    height: number;
    duration: number;
}

export type ImageFile = BaseMediaFile & {
    type: "image";
    width: number;
    height: number;
}

export type AudioFile = BaseMediaFile & {
    type: "audio";
    duration: number;
}

export type DocumentFile = BaseMediaFile & {
    type: "document";
}

export type MediaFile = VideoFile | ImageFile | AudioFile | DocumentFile;