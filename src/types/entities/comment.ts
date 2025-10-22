import type {LikeReaction} from "./reaction.ts";
import type {UserPreview} from "./user.ts";

export type Comment = CommentPreview & { likes: LikeReaction[] }

export type CommentPreview = {
    id: number;
    text: string;
    author: UserPreview;
    isEdited: boolean;
    creationDate: Date;
    likeAmount: number;
}