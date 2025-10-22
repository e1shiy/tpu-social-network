import type {MediaFile} from "./mediafile.ts";
import type {LikeReaction} from "./reaction.ts";
import type {UserPreview} from "./user.ts";

export type Message = MessagePreview & {
    content: {
        attachments: MediaFile[];
    }
    likes: LikeReaction[];
    details: {
        creationDate: Date;
        isEdited: boolean;
    }
};

export type MessagePreview = {
    id: number;
    author: UserPreview;
    content: {
        text: string;
    }
}