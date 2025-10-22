import type {UserPreview} from "../entities";

export type BaseReaction = {
    id: number;
    creationDate: Date;
    type: ReactionType;
    author: UserPreview;
}

export type ReactionTargetType = "post" | "comment" | "message"
export type ReactionType = "like" | "dislike"