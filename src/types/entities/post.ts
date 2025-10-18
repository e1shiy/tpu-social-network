import type {Reaction} from "./reaction.ts";
import type {MediaFile} from "./mediafile.ts";

export type Post = {
    id: number;
    type: "profile" | "community";
    isCommentingAllowed: boolean;
    content: {
        text: string;
        attachments: MediaFile[];
    }
    details: {
        creationDate: Date;
        updateDate: Date | null;
    }
    reactions: Reaction[];
    comments: Comment[];
}