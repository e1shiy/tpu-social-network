import type {UserPreviewResponse} from "./user.ts";

export type CommentResponse = {
    id: number;
    text: string;
    author: UserPreviewResponse;
    isEdited: boolean;
    creationDate: string;
    likeAmount: number;
}
