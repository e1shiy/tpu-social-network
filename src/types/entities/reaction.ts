import type {BaseReaction} from "../domain";

export type Reaction = LikeReaction | DislikeReaction

export type LikeReaction = BaseReaction & {
    type: "like";
}

export type DislikeReaction = BaseReaction & {
    type: "dislike";
}