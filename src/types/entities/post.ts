import type {Reaction} from "./reaction.ts";
import type {UserPreview} from "./user.ts";
import type {MediaFile} from "./index.ts";

export type BasePostPreview = {
    id: number;
    isCommentingAllowed: boolean;
    content: {
        text: string;
        attachments: MediaFile[];
    }
    details: {
        creationDate: Date;
    }
    commentAmount: number;
    likeAmount: number;
    dislikeAmount: number;
}

export type Post = PostPreview & {
    details: {
        updateDate: Date | null;
    }
    reactions: Reaction[];
    comments: Comment[];
}

export type PostPreview = BasePostPreview | CommunityPostPreview;

export type CommunityPostPreview = BasePostPreview & {
    author: UserPreview;
}