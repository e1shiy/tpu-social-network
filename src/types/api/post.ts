import type {UserPreviewResponse} from "./user.ts";
import type {CommentResponse} from "./comment.ts";

type BasePostResponse = {
    id: number;
    isCommentingAllowed: boolean;
    text: string;
    attachmentsIDs: number[]; // mediafiles ids
    updateDate?: string;
    creationDate: string;
    commentAmount: number;
    likeAmount: number;
    dislikeAmount: number;
}

export type CommunityPostResponse = BasePostResponse & {
    author: UserPreviewResponse;
}

export type PostResponse = BasePostResponse | CommunityPostResponse;
export type PostCommentsResponse = CommentResponse[]