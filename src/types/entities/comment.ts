import type {Reaction} from "./reaction.ts";

export type Comment = {
    id: number;
    text: string;
    isEdited: boolean;
    creationDate: Date;
    reactions: Reaction[];
}