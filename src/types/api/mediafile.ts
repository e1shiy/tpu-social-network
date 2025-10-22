import type {MediaFile} from "../entities";

export type MediaFileResponse = Omit<MediaFile, "id">