import type {UserPreviewResponse} from "./user.ts";
import type {ReactionType} from "../domain";

export type ReactionResponse = LikeReactionResponse | DislikeReactionResponse;

type BaseReaction = {
    reactionType: ReactionType;
    author: UserPreviewResponse;
    creationDate: string;
}

export type LikeReactionResponse = BaseReaction & {
    reactionType: "like";
}

export type DislikeReactionResponse = BaseReaction & {
    reactionType: "dislike";
}