import type {UserPreviewResponse} from "./user.ts";

export type MessagePreviewResponse = {
    id: number;
    author: UserPreviewResponse;
    text: string;
}

export type MessageResponse = MessagePreviewResponse & {
    creationDate: string;
    idEdited: boolean;
    attachmentsIDs: number[]; // mediafiles ids
}